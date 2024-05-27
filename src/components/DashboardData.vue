<template>
  <div class="table">
    <div class="row">
      <div class="dashboard-table">
        패킷 송신<br />
        <span>{{ table_pkt_send }}</span>
      </div>
      <div class="dashboard-table">
        패킷 수신<br />
        <span>{{ table_pkt_recv }}</span>
      </div>
    </div>
    <div class="row">
      <div class="dashboard-table">
        데이터 송신<br />
        <span>{{ table_data_send }}</span>
      </div>
      <div class="dashboard-table">
        데이터 수신<br />
        <span>{{ table_data_recv }}</span>
      </div>
    </div>
  </div>
  <div class="dashboard-graph">
    <div class="tab-buttons">
      <button
        :class="{ active: currentTab === 'packets' }"
        @click="currentTab = 'packets'"
      >
        Packet
      </button>
      <button
        :class="{ active: currentTab === 'data' }"
        @click="currentTab = 'data'"
      >
        Data
      </button>
    </div>
    <div class="tab-content">
      <div v-if="currentTab === 'packets'" class="card">
        <Chart
          type="line"
          :data="chartDataPacket"
          :options="chartOptionsPacket"
          class="graph"
        />
      </div>
      <div v-if="currentTab === 'data'" class="card">
        <Chart
          type="line"
          :data="chartDataByte"
          :options="chartOptionsByte"
          class="graph"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { useWebSocketStore } from "@/store";
import { ref, watch, reactive, onMounted, onUnmounted } from "vue";
import Chart from "primevue/chart";

export default {
  components: {
    Chart,
  },
  props: {
    captureButtonState: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      currentTab: "packets",
    };
  },
  setup(props) {
    const websocketStore = useWebSocketStore();

    const table_pkt_recv = ref(0);
    const table_pkt_send = ref(0);
    const table_data_recv = ref(0);
    const table_data_send = ref(0);

    watch(
      () => websocketStore.statMessage,
      (newValue) => {
        if (newValue && newValue.data && newValue.data.length > 0) {
          const { send_pkt, recv_pkt, send_data, recv_data } =
            newValue.data[0].stats;
          table_pkt_recv.value = recv_pkt;
          table_pkt_send.value = send_pkt;
          table_data_recv.value = recv_data;
          table_data_send.value = send_data;
        }
      }
    );

    const updateInterval = 1000;

    const chartDataPacket = reactive({
      labels: Array(60).fill(""),
      datasets: [
        {
          label: "패킷 송신",
          data: Array(60).fill(0),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          borderWidth: 1,
          pointRadius: 0,
        },
        {
          label: "패킷 수신",
          data: Array(60)
            .fill(0)
            .map((value) => -value),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
          borderWidth: 1,
          pointRadius: 0,
        },
      ],
    });
    const chartDataByte = reactive({
      labels: Array(60).fill(""),
      datasets: [
        {
          label: "데이터 송신",
          data: Array(60).fill(0),
          borderColor: "orange",
          backgroundColor: "rgba(255, 165, 0, 0.2)",
          fill: true,
          borderWidth: 1,
          pointRadius: 0,
        },
        {
          label: "데이터 수신",
          data: Array(60)
            .fill(0)
            .map((value) => -value),
          borderColor: "pink",
          backgroundColor: "rgba(255, 192, 203, 0.2)",
          fill: true,
          borderWidth: 1,
          pointRadius: 0,
        },
      ],
    });

    const initialPacketYMin = -100;
    const initialPacketYMax = 100;
    const initialByteYMin = -1000;
    const initialByteYMax = 1000;

    const chartOptionsPacket = reactive({
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      animation: false,
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 20,
          },
        },
        y: {
          reverse: true,
          min: initialPacketYMin,
          max: initialPacketYMax,
          ticks: {
            callback: function (value) {
              return Math.abs(value);
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": 총 ";
              }
              if (context.raw < 0) {
                label += Math.abs(context.raw);
              } else {
                label += context.raw;
              }
              label += " 개";
              return label;
            },
          },
        },
      },
    });

    const chartOptionsByte = reactive({
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      animation: false,
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 20,
          },
        },
        y: {
          reverse: true,
          min: initialByteYMin,
          max: initialByteYMax,
          ticks: {
            callback: function (value) {
              return Math.abs(value);
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": 총 ";
              }
              if (context.raw < 0) {
                label += Math.abs(context.raw);
              } else {
                label += context.raw;
              }
              label += " Byte";
              return label;
            },
          },
        },
      },
    });

    const intervalId = ref(null);

    onMounted(() => {
      intervalId.value = setInterval(updateChartData, updateInterval);
    });

    onUnmounted(() => {
      clearInterval(intervalId.value);
    });

    const updateChartData = () => {
      if (props.captureButtonState) {
        if (
          websocketStore.statMessage.data &&
          websocketStore.statMessage.data.length > 0
        ) {
          const { send_pkt, recv_pkt, send_data, recv_data } =
            websocketStore.statMessage.data[0].stats;

          const maxPacketValue = Math.max(
            ...chartDataPacket.datasets[0].data,
            ...chartDataPacket.datasets[1].data.map(Math.abs)
          );
          const minPacketValue = Math.min(
            ...chartDataPacket.datasets[0].data,
            ...chartDataPacket.datasets[1].data.map(Math.abs)
          );

          const maxByteValue = Math.max(
            ...chartDataByte.datasets[0].data,
            ...chartDataByte.datasets[1].data.map(Math.abs)
          );
          const minByteValue = Math.min(
            ...chartDataByte.datasets[0].data,
            ...chartDataByte.datasets[1].data.map(Math.abs)
          );

          if (
            maxPacketValue > chartOptionsPacket.scales.y.max ||
            minPacketValue < Math.abs(chartOptionsPacket.scales.y.min)
          ) {
            const newMax = Math.ceil(maxPacketValue / 10) * 10;
            const newMin = -newMax;
            chartOptionsPacket.scales.y.max = newMax;
            chartOptionsPacket.scales.y.min = newMin;
          }

          if (
            maxByteValue > chartOptionsByte.scales.y.max ||
            minByteValue < Math.abs(chartOptionsByte.scales.y.min)
          ) {
            const newMax = Math.ceil(maxByteValue / 10) * 10;
            const newMin = -newMax;
            chartOptionsByte.scales.y.max = newMax;
            chartOptionsByte.scales.y.min = newMin;
          }

          const newChartDataPacket = {
            labels: [...chartDataPacket.labels.slice(1), ""],
            datasets: chartDataPacket.datasets.map((dataset, index) => {
              let newDataPoint = 0;
              switch (index) {
                case 0:
                  newDataPoint = send_pkt;
                  break;
                case 1:
                  newDataPoint = -recv_pkt;
                  break;
                default:
                  break;
              }
              return {
                ...dataset,
                data: [...dataset.data.slice(1), newDataPoint],
              };
            }),
          };

          const newChartDataByte = {
            labels: [...chartDataByte.labels.slice(1), ""],
            datasets: chartDataByte.datasets.map((dataset, index) => {
              let newDataPoint = 0;
              switch (index) {
                case 0:
                  newDataPoint = send_data;
                  break;
                case 1:
                  newDataPoint = -recv_data;
                  break;
                default:
                  break;
              }
              return {
                ...dataset,
                data: [...dataset.data.slice(1), newDataPoint],
              };
            }),
          };

          chartDataPacket.labels = newChartDataPacket.labels;
          chartDataPacket.datasets = newChartDataPacket.datasets;
          chartDataByte.labels = newChartDataByte.labels;
          chartDataByte.datasets = newChartDataByte.datasets;
        }
      }
    };

    return {
      table_pkt_recv,
      table_pkt_send,
      table_data_recv,
      table_data_send,
      chartDataPacket,
      chartDataByte,
      chartOptionsPacket,
      chartOptionsByte,
    };
  },
};
</script>
<style>
.card {
  height: 100%;
}
.tab-content {
  flex-grow: 1;
}
.dashboard-graph {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.table {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: space-around;
}

.dashboard-table {
  flex-basis: 50%;
  text-align: center;
  font-size: small;
  box-sizing: border-box;
}
.graph {
  height: 100%;
  background-color: #ffffff;
}

.tab-buttons button {
  background-color: #e5f3f6;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  width: 50%;
  font-weight: 600;
  color: #a6acaf;
}

.tab-buttons button.active {
  background-color: #ffffff;
  border-top: #e5f3f6 solid;
  border-left: #e5f3f6 solid;
  border-right: #e5f3f6 solid;
  font-weight: 900;
  color: #24292c;
}
</style>
