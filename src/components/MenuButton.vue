<template>
  <div class="menu-button-container">
    <ToggleButton
      v-model="captureButtonState"
      onLabel="Stop"
      offLabel="Start"
      @change="handleCaptureToggle"
    />
    <SplitButton
      label="Save"
      :model="items"
      :disabled="captureButtonState || !captureStore.packetMessages.length"
      @click="handleSplitButtonClick"
    />
  </div>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";
import ToggleButton from "primevue/togglebutton";
import SplitButton from "primevue/splitbutton";
import { useCaptureStore } from "@/stores";
import { ref, defineProps } from "vue";

const props = defineProps({
  deviceIp: {
    type: String,
    required: true,
  },
});

const captureStore = useCaptureStore();
const captureButtonState = ref(false);
const items = [
  { label: "PCAP", command: () => handleDownload("pcap") },
  { label: "JSON", command: () => handleDownload("json") },
  { label: "CSV", command: () => handleDownload("csv") }
];

const handleCaptureToggle = () => {
  if (captureButtonState.value) {
    console.log("capture start");
    captureStore.startCapture(props.deviceIp);
  } else {
    console.log("capture stop");
    captureStore.stopCapture();
  }
};

const handleSplitButtonClick = () => {
  captureStore.downloadPacketFile(props.deviceIp, "pcap");
};

const handleDownload = (format: string) => {
  captureStore.downloadPacketFile(props.deviceIp, format);
};
</script>

<style scoped>
.menu-button-container {
  display: flex;
  gap: 6px;
}

.p-component,
.p-component * {
  box-sizing: border-box;
  font-size: 13px;
  /* padding: 0.3rem 0.4rem; */
}
</style>
