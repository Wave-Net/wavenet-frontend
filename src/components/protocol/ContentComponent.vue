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
          :style="fieldStyle(field)"
          :class="['field-box-diagram', `part-${field.originalName}`]"
          @mouseover="handleMouseOver(field.originalName)"
          @mouseleave="handleMouseLeave(field.originalName)"
        >
          <template v-if="isWidestBox(field)">
            <div>{{ field.name }} ({{ field.totalBits }} bits)</div>
            <div>{{ field.value }}</div>
          </template>
        </div>
        <div
          v-if="remainingWidth(fieldRowIndex) > 0"
          :style="{
            ...remainingStyle(remainingWidth(fieldRowIndex)),
            borderTop: '0.1px solid #7bc2d0',
          }"
          class="empty-box"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from "vue";

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

const handleMouseOver = (partName: string) => {
  hoveredPart.value = partName;
};

const handleMouseLeave = (partName: string) => {
  if (hoveredPart.value === partName) {
    hoveredPart.value = "";
  }
};

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
    let remainingFieldBits = field.field_length;
    let partNumber = 1;

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

const fieldStyle = (field) => {
  return {
    width: `${field.width}%`,
    height: "36px",
    borderTop: field.isFirstPart ? "1px solid #7bc2d0" : "none",
    borderBottom: field.isLastPart ? "1px solid #7bc2d0" : "none",
    borderLeft: "1px solid #7bc2d0",
    borderRight: "1px solid #7bc2d0",
    borderRadius: "2.8px",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
    backgroundColor:
      hoveredPart.value === field.originalName ? "#f0f0f0" : "transparent",
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
.title-diagram {
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  padding: 5px 10px;
  color: #fff;
  background-color: #7bc2d0;
  border: 2px solid #7bc2d0;
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
}

.empty-box {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  padding: 4px;
}

.byte-style-right {
  background-image: linear-gradient(to top, #7bc2d0 50%, transparent 25%),
    linear-gradient(to top, #7bc2d0 90%, transparent 20%);
  background-size: 2px 100%;
  background-position: left, right;
  background-repeat: no-repeat;
}
.byte-style-left {
  background-image: linear-gradient(to top, #7bc2d0 90%, transparent 20%);
  background-size: 2px 100%;
  background-position: left;
  background-repeat: no-repeat;
}
.byte-style-center {
  background-image: linear-gradient(to top, #7bc2d0 50%, transparent 25%);
  background-size: 2px 100%;
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
  color: #7bc2d0;
  border-bottom: #7bc2d0 solid 0.1px;
}
</style>
