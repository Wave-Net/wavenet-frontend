<template>
  <Chart
    type="line"
    :data="packetCntChartData"
    :options="chartOptions"
    class="graph"
  />
  <Chart
    type="line"
    :data="packetLenChartData"
    :options="chartOptions"
    class="graph"
  />
</template>

<script setup lang="ts">
import Chart from "primevue/chart";
import { useCaptureStore } from "@/stores";
import { watch, computed, ref } from "vue";

const captureStore = useCaptureStore();
const MAX_LENGTH = 60;

const sendPktArray = ref(Array(MAX_LENGTH).fill(0));
const recvPktArray = ref(Array(MAX_LENGTH).fill(0));
const sendDataArray = ref(Array(MAX_LENGTH).fill(0));
const recvDataArray = ref(Array(MAX_LENGTH).fill(0));

const updateArray = (array: any, value: number) => {
  const newArray =
    array.value.length >= MAX_LENGTH ? array.value.slice(1) : [...array.value];
  array.value = [...newArray, value];
};

watch(
  () => captureStore.statMessage,
  (newStatMessage) => {
    if (newStatMessage) {
      updateArray(sendPktArray, newStatMessage.send_pkt);
      updateArray(recvPktArray, newStatMessage.recv_pkt);
      updateArray(sendDataArray, newStatMessage.send_data);
      updateArray(recvDataArray, newStatMessage.recv_data);
    }
  }
);

const baseDataset = {
  fill: true,
  borderWidth: 1,
  pointRadius: 0,
};

const packetCntChartData = computed(() => {
  return {
    labels: Array(MAX_LENGTH).fill(""),
    datasets: [
      {
        ...baseDataset,
        label: "Sent Packets",
        data: sendPktArray.value.map((value) => -value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        ...baseDataset,
        label: "Received Packets",
        data: recvPktArray.value,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
});

const packetLenChartData = computed(() => {
  return {
    labels: Array(MAX_LENGTH).fill(""),
    datasets: [
      {
        ...baseDataset,
        label: "Sent Data",
        data: sendDataArray.value.map((value) => -value),
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
      },
      {
        ...baseDataset,
        label: "Received Data",
        data: recvDataArray.value,
        borderColor: "pink",
        backgroundColor: "rgba(255, 192, 203, 0.2)",
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<style scoped></style>
