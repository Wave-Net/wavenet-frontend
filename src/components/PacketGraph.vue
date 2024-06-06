<template>
  <div class="graph-container">
    <div class="mb-4 mt-2">
      <Chart
        type="line"
        :data="packetCntChartData"
        :options="packetCntChartOptions"
        class="graph"
      />
      <div class="graph-value-container">
        <div class="p-1">Packet</div>
        <div class="p-1">
          Recv: {{ totalStat.recvPkt }}<br />
          Send: {{ totalStat.sendPkt }}
        </div>
      </div>
    </div>
    <div class="mb-4">
      <Chart
        type="line"
        :data="packetLenChartData"
        :options="packetLenChartOptions"
        class="graph"
      />
      <div class="graph-value-container">
        <div class="p-1">Data</div>
        <div class="p-1">
          Recv: {{ totalStat.recvData }}<br />
          Send: {{ totalStat.sendData }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from "primevue/chart";
import { useCaptureStore } from "@/stores";
import { watch, computed, ref, Ref, reactive } from "vue";

const captureStore = useCaptureStore();
const MAX_LENGTH = 60;

const recvPktArray = ref(Array(MAX_LENGTH).fill(0));
const sendPktArray = ref(Array(MAX_LENGTH).fill(0));
const recvDataArray = ref(Array(MAX_LENGTH).fill(0));
const sendDataArray = ref(Array(MAX_LENGTH).fill(0));

const pktMax = ref(0);
const dataMax = ref(0);

const totalStat = reactive({
  recvPkt: 0,
  sendPkt: 0,
  recvData: 0,
  sendData: 0,
});

const updateTotal = (newStatMessage: any) => {
  totalStat.recvPkt += newStatMessage.recv_pkt;
  totalStat.sendPkt += newStatMessage.send_pkt;
  totalStat.recvData += newStatMessage.recv_data;
  totalStat.sendData += newStatMessage.send_data;
};

const updateArray = (array: any, value: number) => {
  const newArray =
    array.value.length >= MAX_LENGTH ? array.value.slice(1) : [...array.value];
  array.value = [...newArray, value];
};

const updateArraysAndMax = (
  recvArray: Ref<number[]>,
  sendArray: Ref<number[]>,
  recvValue: number,
  sendValue: number
) => {
  updateArray(recvArray, recvValue);
  updateArray(sendArray, sendValue);
  return Math.max(
    ...recvArray.value.map(Math.abs),
    ...sendArray.value.map(Math.abs)
  );
};

watch(
  () => captureStore.statMessage,
  (newStatMessage) => {
    if (newStatMessage) {
      pktMax.value = updateArraysAndMax(
        recvPktArray,
        sendPktArray,
        newStatMessage.recv_pkt,
        newStatMessage.send_pkt
      );
      dataMax.value = updateArraysAndMax(
        recvDataArray,
        sendDataArray,
        newStatMessage.recv_data,
        newStatMessage.send_data
      );

      updateTotal(newStatMessage);
    }
  }
);

watch(pktMax, (newMax) => {
  packetCntChartOptions.scales.y.min = -newMax;
  packetCntChartOptions.scales.y.max = newMax;
});

watch(dataMax, (newMax) => {
  packetLenChartOptions.scales.y.min = -newMax;
  packetLenChartOptions.scales.y.max = newMax;
});

watch(
  () => captureStore.isCapturing,
  (newVal) => {
    if (newVal) {
      recvPktArray.value = Array(MAX_LENGTH).fill(0);
      sendPktArray.value = Array(MAX_LENGTH).fill(0);
      recvDataArray.value = Array(MAX_LENGTH).fill(0);
      sendDataArray.value = Array(MAX_LENGTH).fill(0);
      totalStat.recvPkt = 0;
      totalStat.sendPkt = 0;
      totalStat.recvData = 0;
      totalStat.sendData = 0;
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
        label: "Received Packets",
        data: recvPktArray.value,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        ...baseDataset,
        label: "Sent Packets",
        data: sendPktArray.value.map((value) => -value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
        label: "Received Data",
        data: recvDataArray.value,
        borderColor: "pink",
        backgroundColor: "rgba(255, 192, 203, 0.2)",
      },
      {
        ...baseDataset,
        label: "Sent Data",
        data: sendDataArray.value.map((value) => -value),
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
      },
    ],
  };
});

const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  animation: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const packetCntChartOptions = {
  ...baseChartOptions,
  scales: {
    x: {
      display: true,
      grid: {
        display: true,
      },
    },
    y: {
      display: false,
      min: -1,
      max: 1,
    },
  },
};

const packetLenChartOptions = {
  ...baseChartOptions,
  scales: {
    x: {
      display: true,
      grid: {
        display: true,
      },
    },
    y: {
      display: false,
      min: -1,
      max: 1,
    },
  },
};
</script>

<style scoped>
.graph-container {
  width: 180px;
  display: flex;
  flex-direction: column;
}

.graph-value-container {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  padding-left: 0.3rem;
  padding-right: 0.75rem;
  padding-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-width: 0 0 1px 0;
  color: rgba(34, 42, 66, 0.7);
}
</style>
