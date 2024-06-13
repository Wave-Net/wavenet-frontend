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
      :sortable="true"
    >
      <template #body="slotProps">
        <span :style="{ 'font-weight': '400' }">
          {{ getValue(slotProps.data, col.field) }}
        </span>
      </template>
    </Column>
    <Column field="dynamicFieldValue" header="Info" :sortable="true">
      <template #body="slotProps">
        <span :style="{ 'font-weight': '400' }">
          {{ getDynamicFieldValue(slotProps.data) }}
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
const packetMessages = computed(() => {
  return captureStore.packetMessages.map((message) => ({
    ...message,
    dynamicFieldValue: getDynamicFieldValue(message),
  }));
});

const columns = [
  { field: "info.index", header: "#", style: { width: "10px" } },
  { field: "info.seconds_since_beginning", header: "Time" },
  { field: "layers.IP.src.value", header: "Src" },
  { field: "layers.IP.dst.value", header: "Dst" },
  { field: "info.protocol", header: "Protocol" },
  { field: "info.len", header: "Length" },
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

const getValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const getDynamicFieldValue = (data) => {
  let dynamicField = "";
  if (data.info.protocol === "MQTT") {
    dynamicField = getValue(data, "info.summary");
    const msgId = getValue(data, "layers.MQTT.msgid.value");
    if (msgId) {
      dynamicField += ` ,(Msg ID: ${msgId})`;
    }
    const msg = getValue(data, "layers.MQTT.msg.ascii");
    if (msg) {
      dynamicField += ` ,(Msg: ${msg})`;
    }
    const rtcode = getValue(data, "layers.MQTT.conack_val.value");
    if (rtcode) {
      dynamicField += ` ,(Return Code: ${rtcode})`;
    }
  } else if (data.info.protocol === "CoAP") {
    dynamicField = getValue(data, "info.summary");
    const msgId = getValue(data, "layers.COAP.mid.value");
    if (msgId) {
      dynamicField += ` ,(Msg ID: ${msgId})`;
    }
  }
  return dynamicField;
};
</script>

<style scoped></style>
