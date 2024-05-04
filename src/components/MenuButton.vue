<template>
  <div>
    <ToggleButton
      v-model="captureButtonState"
      onLabel="시작"
      offLabel="중단"
      onIcon="pi pi-play-circle"
      offIcon="pi pi-stop-circle"
      class="startButton"
      @change="handleCaptureToggle"
    />

    <SplitButton
      label="데이터내보내기"
      :model="items"
      :disabled="!captureButtonState"
      class="dataPrint"
    >
      <i class="pi pi-download"> 데이터 내보내기</i>
    </SplitButton>
  </div>
</template>

<script setup>
import ToggleButton from 'primevue/togglebutton';
import SplitButton from 'primevue/splitbutton';
import 'primeicons/primeicons.css'
import { useWebSocketStore } from '@/store/websocketStore';
import { ref } from 'vue';

const websocketStore = useWebSocketStore();
const captureButtonState = ref(true);
const items = [
  { label: "PCAP" },
  { label: "JSON" },
  { label: "CSV" }
];

const handleCaptureToggle = () => {
  if (captureButtonState.value) {
    console.log('capture stop');
    websocketStore.stopCapture();
  } else {
    console.log('capture start');
    websocketStore.startCapture();
  }
};
</script>

<style>
.startButton{
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
}
.dataPrint{
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
}
</style>
