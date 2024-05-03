<template>
    <div class="card">
      <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted, ref } from "vue";
  import { onUnmounted } from '@vue/runtime-core';
  import Chart from 'primevue/chart';

  // 데이터 갱신 간격 (밀리초)
  const updateInterval = 1000;
  
  // 초기 차트 데이터 설정
  const chartData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'cyan',
        tension: 0.4
      },
      {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: 'gray',
        tension: 0.4
      }
    ]
  });
  
  // 차트 옵션 설정
  const chartOptions = reactive({
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  plugins: {
    legend: {
      labels: {
        color: 'black'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'black'
      },
      grid: {
        color: 'black'
      }
    },
    y: {
      ticks: {
        color: 'black'
      },
      grid: {
        color: 'black'
      }
    }
  },
  // animation 비활성화
  animation: false
});
  
  // interval ID를 저장할 변수
  const intervalId = ref(null);
  
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
    const newDataPoint1 = Math.floor(Math.random() * 100); // 새로운 데이터 생성
    const newDataPoint2 = Math.floor(Math.random() * 100); // 새로운 데이터 생성
  
    // 새로운 데이터 추가
    const newChartData = {
      labels: [...chartData.labels.slice(1), 'New Label'], // 새로운 라벨 추가
      datasets: [
        {
          ...chartData.datasets[0],
          data: [...chartData.datasets[0].data.slice(1), newDataPoint1], // 새로운 데이터 추가
        },
        {
          ...chartData.datasets[1],
          data: [...chartData.datasets[1].data.slice(1), newDataPoint2], // 새로운 데이터 추가
        }
      ]
    };
  
    // 데이터 반영
    chartData.labels = newChartData.labels;
    chartData.datasets[0].data = newChartData.datasets[0].data;
    chartData.datasets[1].data = newChartData.datasets[1].data;
  };
  </script>
  