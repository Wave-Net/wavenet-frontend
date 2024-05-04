<template>
  <div>
    <ToggleButton
      v-model="isCaptureRunning"
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
      :disabled="isCaptureRunning"
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

const websocketStore = useWebSocketStore();
let isCaptureRunning = false;

// 토글 버튼 클릭 시 실행되는 메서드
const handleCaptureToggle = () => {
  if (isCaptureRunning.value) {
    console.log('capture stop: ', isCaptureRunning)
    websocketStore.stopCapture();
  } else {
    console.log('capture start: ', isCaptureRunning)
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
