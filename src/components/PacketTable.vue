<template>
  <DataTable
    :value="packetMessages"
    removableSort
    scrollable
    :scroll-height="props.scrollableHeight"
    rowHover
    @row-click="handleRowClick"
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
});

const captureStore = useCaptureStore();
const packetMessages = computed(() => captureStore.packetMessages);

const columns = [
  { field: "index", header: "#", style: { width: "10px" }, sortable: true },
  { field: "seconds_since_beginning", header: "Time" },
  { field: "src", header: "Src" },
  { field: "dst", header: "Dst" },
  { field: "layer", header: "Protocol" },
  { field: "length", header: "Len", sortable: true },
  { field: "type", header: "Info" },
];

const emit = defineEmits(["row-click"]);

const handleRowClick = (event) => {
  emit("row-click", event);
};
</script>
