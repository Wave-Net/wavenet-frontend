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
    />
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
  // { field: "length", header: "Len", sortable: true },
  // { field: "mqtt_type", header: "Info" },
];

const emit = defineEmits(["row-click"]);

const handleRowClick = (event) => {
  emit("row-click", event);
};

const rowClass = (data) => {
  console.log("이거먼데", data.info.index);
  if (data.info.index === props.highlightedIndex) {
    return "highlight";
  } else if (data.info.index === props.highlightedFlowchartIndex) {
    return "flowchart-highlight";
  }
  return "";
};

// //하이라이트 인덱스 확인 코드
// // Watch for changes in highlightedIndex and highlightedFlowchartIndex
// watch(
//   () => [props.highlightedIndex, props.highlightedFlowchartIndex],
//   ([newIndex, newFlowchartIndex]) => {
//     console.log("highlightedIndex changed to:", newIndex);
//     console.log("highlightedFlowchartIndex changed to:", newFlowchartIndex);
//   }
// );
</script>

<style>
.highlight {
  background-color: #b2dfdb45; /* 하이라이트 스타일 */
}
</style>
