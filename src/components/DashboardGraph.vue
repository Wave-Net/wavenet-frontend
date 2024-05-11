<template>
  <div class="card">
    <Chart type="line" :data="chartData" :options="chartOptions" class="graph" @legendClick="toggleLineVisibility" />
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { onUnmounted, defineProps } from '@vue/runtime-core';
import Chart from 'primevue/chart';

import { useWebSocketStore } from '@/store/websocketStore';

const store = useWebSocketStore();

// Props 정의
const props = defineProps(['labelData1', 'labelData2','labelData3','labelData4']);

// 데이터 갱신 간격 (밀리초)
const updateInterval = 1000;

// 초기 차트 데이터 설정
const chartData = reactive({
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: props.labelData1,
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: 'cyan',
      tension: 0.4,
      borderWidth: 1,
      pointRadius: 2,
    },
    {
      label: props.labelData2,
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: 'gray',
      tension: 0.4,
      borderWidth: 1,
      pointRadius: 2,
    },
    {
      label: props.labelData3,
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: 'orange',
      tension: 0.4,
      borderWidth: 1,
      pointRadius: 2,
    },
    {
      label: props.labelData4,
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: 'pink',
      tension: 0.4,
      borderWidth: 1,
      pointRadius: 2,
    },
  ],

});
// 차트 옵션 설정
const chartOptions = reactive({
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  
  // animation 비활성화
  animation: false
});

// interval ID를 저장할 변수
const intervalId = ref(null);

const datasetVisibility = reactive([
  { visible: true },
  { visible: true },
  { visible: true },
  { visible: true },
]);

// 차트의 범례 항목을 클릭하여 선의 가시성을 변경하는 메소드
const toggleLineVisibility = (event) => {
  const datasetIndex = event.element.datasetIndex;
  const chart = event.chart;
  // 가시성 배열을 토글하여 해당 데이터셋의 가시성을 변경
  datasetVisibility[datasetIndex].visible = !datasetVisibility[datasetIndex].visible;
  chart.data.datasets[datasetIndex].hidden = !datasetVisibility[datasetIndex].visible;
  chart.update();
};

onMounted(() => {
  // interval 설정
  intervalId.value = setInterval(updateChartData, updateInterval);
});

// 컴포넌트가 제거될 때 interval 해제
onUnmounted(() => {
  clearInterval(intervalId.value);
});

// 데이터 업데이트
const updateChartData = () => {
  // staticsDelta 객체 확인
  const { send_pkt, recv_pkt, send_data, recv_data } = store.statMessage.statDelta;
  
  // 새로운 데이터 추가
  const newChartData = {
    labels: [...chartData.labels.slice(1), ''],
    datasets: chartData.datasets.map((dataset, index) => {
      let newDataPoint = 0;
      // index에 따라 데이터 설정
      switch(index) {
        case 0:
          newDataPoint = send_pkt;
          break;
        case 1:
          newDataPoint = recv_pkt;
          break;
        case 2:
          newDataPoint = send_data;
          break;
        case 3:
          newDataPoint = recv_data;
          break;
        default:
          break;
      }
      return {
        ...dataset,
        data: [...dataset.data.slice(1), newDataPoint]
      };
    })
  };

  // 데이터 반영
  chartData.labels = newChartData.labels;
  chartData.datasets = newChartData.datasets;
};

</script>

<style>
.graph {
  height: 100%;
}
</style>
