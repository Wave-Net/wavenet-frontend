<template>
  <DataTable
    :value="packetMessages"
    removableSort
    scrollable
    :scroll-height="props.scrollableHeight"
    rowHover
    @row-click="handleRowClick"
    :row-class="rowClass"
  >
    <Column
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :style="col.style"
      :sortable="col.sortable"
    >
      <template #body="slotProps">
        <span v-if="col.field === 'dynamicField'">
          {{ getDynamicFieldValue(slotProps.data) }}
        </span>
        <span v-else>
          {{ getValue(slotProps.data, col.field) }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useCaptureStore } from "@/stores";
import { computed } from "vue";

const props = defineProps({
  scrollableHeight: {
    type: String,
    required: true,
  },
  highlightedIndex: {
    type: Number,
    default: null,
  },
  highlightedFlowchartIndex: {
    type: Number,
    default: null,
  },
});

const captureStore = useCaptureStore();
const packetMessages = computed(() => captureStore.packetMessages);

const columns = [
  {
    field: "info.index",
    header: "#",
    style: { width: "10px" },
    sortable: true,
  },
  { field: "info.seconds_since_beginning", header: "Time" },
  { field: "layers.IP.src.value", header: "Src" },
  { field: "layers.IP.dst.value", header: "Dst" },
  { field: "info.protocol", header: "Protocol" },
  { field: "info.len", header: "Length" },
  { field: "dynamicField", header: "Info" }, // 동적 필드 추가
];

const emit = defineEmits(["row-click"]);

const handleRowClick = (event) => {
  emit("row-click", event);
};

const rowClass = (data) => {
  if (data.info.index === props.highlightedIndex) {
    return "highlight";
  } else if (data.info.index === props.highlightedFlowchartIndex) {
    return "flowchart-highlight";
  }
  return "";
};

// 객체에서 중첩된 필드 값을 가져오는 함수
const getValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

// 조건에 따라 동적 필드 값을 가져오는 함수
const getDynamicFieldValue = (data) => {
  if (data.info.protocol === "MQTT") {
    return getValue(data, "info.summary");
  } else if (data.info.protocol === "CoAP") {
    return getValue(data, "info.summary");
  }
  return "";
};
</script>

<style>
.highlight {
  background-color: #b2dfdb45; /* 하이라이트 스타일 */
}
</style>
