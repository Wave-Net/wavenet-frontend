<template>
  <div>
    <ToggleButton
      v-model="captureButtonState"
      onLabel="중단"
      offLabel="시작"
      onIcon="pi pi-stop-circle"
      offIcon="pi pi-play-circle"
      class="startButton"
      @change="handleCaptureToggle"
    />
    <SplitButton
      label="데이터내보내기"
      :model="items"
      :disabled="captureButtonState"
      class="dataPrint"
    >
      <i class="pi pi-download"
        ><span style="padding-left: 5px">데이터 내보내기</span></i
      >
    </SplitButton>
  </div>
</template>

<script setup>
import ToggleButton from "primevue/togglebutton";
import SplitButton from "primevue/splitbutton";
import "primeicons/primeicons.css";
import { useWebSocketStore } from "@/store";
import { ref, defineEmits } from "vue";

const emit = defineEmits(["capture-state-change"]);

const websocketStore = useWebSocketStore();
const captureButtonState = ref(false);
const items = [{ label: "PCAP" }, { label: "JSON" }, { label: "CSV" }];

const handleCaptureToggle = () => {
  if (captureButtonState.value) {
    console.log("capture start");
    websocketStore.startCapture();
  } else {
    console.log("capture stop");
    websocketStore.stopCapture();
  }
  //capture-state-change 이벤트를 발생시켜 상위 컴포넌트인 Capture.vue에 captureButtonState의 변경 사항을 알립니다.
  emit("capture-state-change", captureButtonState.value);
};
</script>

<style>
.startButton {
  /* margin-left: 3.5px; */
  margin-right: 4.5px;
}

.dataPrint {
  /* margin-right: 3.5px; */
}

.p-splitbutton-defaultbutton {
  padding-left: 5px !important;
  padding-right: 5px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
