<template>
  <div class="menu-button-container">
    <ToggleButton
      v-model="captureButtonState"
      onLabel="Stop"
      offLabel="Start"
      @change="handleCaptureToggle"
    />
    <SplitButton label="Save" :model="items" :disabled="captureButtonState" />
  </div>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";
import ToggleButton from "primevue/togglebutton";
import SplitButton from "primevue/splitbutton";
import { useCaptureStore } from "@/stores";
import { ref, defineEmits, defineProps } from "vue";

const emit = defineEmits(["capture-state-change"]);
const props = defineProps({
  deviceIp: {
    type: String,
    required: true,
  },
});

const captureStore = useCaptureStore();
const captureButtonState = ref(false);
const items = [{ label: "PCAP" }, { label: "JSON" }, { label: "CSV" }];

const handleCaptureToggle = () => {
  if (captureButtonState.value) {
    console.log("capture start");
    captureStore.startCapture(props.deviceIp);
  } else {
    console.log("capture stop");
    captureStore.stopCapture();
  }
  emit("capture-state-change", captureButtonState.value);
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
