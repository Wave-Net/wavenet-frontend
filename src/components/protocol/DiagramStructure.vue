<template>
  <div class="wrap-container">
    <div class="unit-diagram">
      <div class="byte-style byte-style-left">0</div>
      <div v-for="index in 7" :key="index" class="byte-style-center byte-style">
        {{ index }}
      </div>
      <div class="byte-style byte-style-left">8</div>
      <div v-for="index in 6" :key="index" class="byte-style-center byte-style">
        {{ index + 8 }}
      </div>
      <div class="byte-style-right byte-style">15</div>
    </div>
    <div class="wrap-diagram">
      <div
        class="row-diagram"
        v-for="(fieldRow, fieldRowIndex) in fieldRows"
        :key="fieldRowIndex"
      >
        <div
          v-for="(field, fieldIndex) in fieldRow"
          :key="fieldIndex"
          :style="fieldStyle(field, fieldIndex === fieldRow.length - 1)"
          :class="[
            'field-box-diagram',
            `part-${field.originalName}`,
            { selected: field.isSelected },
            { truncated: field.isTruncated },
          ]"
          @mouseover="handleMouseOver(field.originalName)"
          @mouseleave="handleMouseLeave(field.originalName)"
          @click="handleClick(field)"
        >
          <template v-if="isWidestBox(field)">
            <div class="diagram-field-title">
              {{ field.name }} ({{ field.totalBits }} bits)
            </div>
            <div class="diagram-field-content">{{ field.value }}</div>
          </template>
          <template v-if="field.isTruncated">
            <div class="truncated-indicator">...</div>
          </template>
        </div>
        <div
          v-if="remainingWidth(fieldRowIndex) > 0"
          :style="{
            ...remainingStyle(remainingWidth(fieldRowIndex)),
            borderTop: '0.1px solid #2c3e50',
          }"
          class="empty-box"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, watch, onMounted, onUnmounted } from "vue";
import { eventBus } from "@/eventBus";

const props = defineProps({
  fields: {
    type: Object as () => Record<
      string,
      { value: string; raw_bytes: string; ascii: string; field_length: number }
    >,
    required: true,
  },
});

const hoveredPart = ref("");
const selectedPart = ref<string | null>(null);

const handleMouseOver = (partName: string) => {
  hoveredPart.value = partName;
};

const handleMouseLeave = (partName: string) => {
  if (hoveredPart.value === partName) {
    hoveredPart.value = "";
  }
};

const handleClick = (field: any) => {
  if (selectedPart.value === field.originalName) {
    selectedPart.value = null;
    eventBus.emit("toggleAccordion", field.originalName, false);
  } else {
    selectedPart.value = field.originalName;
    eventBus.emit("toggleAccordion", field.originalName, true);
  }
};

const handleHighlightField = (fieldName: string, shouldHighlight: boolean) => {
  if (shouldHighlight) {
    selectedPart.value = fieldName;
  } else {
    if (selectedPart.value === fieldName) {
      selectedPart.value = null;
    }
  }
};

onMounted(() => {
  eventBus.on("highlightField", handleHighlightField);
});

onUnmounted(() => {
  eventBus.off("highlightField", handleHighlightField);
});

const fieldRows = computed(() => {
  const rows = [];
  let remainingBitsInRow = 16;
  let currentRowFields = [];
  const fieldWidths = {};

  const fieldsArray = Object.entries(props.fields).map(([key, field]) => ({
    name: key,
    ...field,
  }));

  for (const field of fieldsArray) {
    let remainingFieldBits = Math.min(field.field_length, 32); // 필드 비트 길이를 최대 32bit로 제한
    let partNumber = 1;
    const isTruncated = field.field_length > 32;

    while (remainingFieldBits > 0) {
      const bitsForCurrentBox = Math.min(
        remainingBitsInRow,
        remainingFieldBits
      );
      const widthPercentage = bitsForCurrentBox * 6.25;
      const isFirstPart = remainingFieldBits === field.field_length;
      const isLastPart = remainingFieldBits <= 16;

      const fieldPart = {
        name:
          field.name + (field.field_length > 16 ? ` (part ${partNumber})` : ""),
        bits: bitsForCurrentBox,
        width: widthPercentage,
        isFirstPart: isFirstPart,
        isLastPart: isLastPart,
        originalName: field.name,
        totalBits: field.field_length,
        value: field.value,
        isSelected: field.originalName === selectedPart.value,
        isTruncated: isTruncated && remainingFieldBits <= 16,
      };

      currentRowFields.push(fieldPart);

      if (
        !fieldWidths[field.name] ||
        fieldWidths[field.name].width < widthPercentage
      ) {
        fieldWidths[field.name] = {
          width: widthPercentage,
          rowIndex: rows.length,
          fieldIndex: currentRowFields.length - 1,
        };
      }

      remainingFieldBits -= bitsForCurrentBox;
      remainingBitsInRow -= bitsForCurrentBox;
      partNumber++;

      if (remainingBitsInRow === 0) {
        rows.push(currentRowFields);
        currentRowFields = [];
        remainingBitsInRow = 16;
      }
    }
  }

  if (currentRowFields.length > 0) {
    rows.push(currentRowFields);
  }

  for (const fieldName in fieldWidths) {
    const { rowIndex, fieldIndex } = fieldWidths[fieldName];
    rows[rowIndex][fieldIndex].isWidest = true;
  }

  return rows;
});

watch(selectedPart, () => {
  fieldRows.value.forEach((row) => {
    row.forEach((field) => {
      field.isSelected = field.originalName === selectedPart.value;
    });
  });
});

const fieldStyle = (field, isLastInRow) => {
  return {
    width: `${field.width}%`,
    height: "50px",
    borderTop: field.isFirstPart ? "1px solid #2c3e50" : "none",
    borderBottom: field.isLastPart ? "1px solid #2c3e50" : "none",
    borderLeft: "1px solid #2c3e50",
    borderRight: isLastInRow ? "1px solid #2c3e50" : "none",
    backgroundColor:
      hoveredPart.value === field.originalName
        ? "#2c3e5035"
        : field.isSelected
        ? "#2c3e5035"
        : "transparent",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
  };
};

const remainingWidth = (fieldRowIndex) => {
  const rowFields = fieldRows.value[fieldRowIndex];
  const occupiedWidth = rowFields.reduce((sum, field) => sum + field.width, 0);
  return 100 - occupiedWidth;
};

const remainingStyle = (width) => {
  return {
    width: `${width}%`,
    height: "36px",
    border: "1px solid transparent",
  };
};

const isWidestBox = (field) => {
  return field.isWidest || false;
};
</script>

<style scoped>
.diagram-field-title {
  font-size: 10px;
  color: #999999;
}

.diagram-field-content {
  font-size: 13px;
}

.truncated-indicator {
  font-size: 20px;
  color: #2c3e50;
}

.title-diagram {
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  padding: 5px 10px;
  color: #fff;
  background-color: #2c3e50;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  box-sizing: border-box;
}

.wrap-container {
  width: 100%;
  height: 100%;
  padding: 7px;
}

.unit-diagram {
  width: 100%;
  height: 18px;
  display: flex;
}

.wrap-diagram {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-family: "Poppins", sans-serif;
  width: 100%;
}

.row-diagram {
  display: flex;
}

.field-box-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  padding: 4px;
  cursor: pointer;
  overflow: hidden; /* 넘치는 내용을 숨김 */
  text-overflow: ellipsis; /* 넘치는 내용을 생략 부호(...)로 표시 */
  white-space: nowrap; /* 텍스트를 한 줄로 유지 */
}

.byte-style-left {
  border-left: 0.1px solid #2c3e50;
  border-bottom: 0.1px solid #2c3e50;
}

.byte-style-right {
  border-right: 0.1px solid #2c3e50;
  border-bottom: 0.1px solid #2c3e50;
}

.byte-style-center {
  background-image: linear-gradient(to top, #2c3e50 50%, transparent 25%);
  background-size: 1px 100%;
  background-position: left;
  background-repeat: no-repeat;
}

.byte-style {
  height: 18px;
  width: 6.25%;
  box-sizing: border-box;
  font-size: 10px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  color: #2c3e50;
  border-bottom: #2c3e50 solid 0.1px;
}

.field-box-diagram.selected {
  background-color: #2c3e5035;
}
</style>
