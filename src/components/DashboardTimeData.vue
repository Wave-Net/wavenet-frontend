<template>
  <div class="dashboard-graph card">
    <div class="dropdown-container">
      <select v-model="selectedGraph" @change="onGraphChange">
        <option
          v-for="option in graphOptions"
          :value="option.value"
          :key="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="graph-content">
      <div v-if="selectedGraph === 'packets_time'">
        <Chart
          type="line"
          :data="chartDataPacket_time"
          :options="chartOptionsPacket_time"
          class="graph"
        />
      </div>
      <div v-if="selectedGraph === 'data_time'">
        <Chart
          type="line"
          :data="chartDataByte_time"
          :options="chartOptionsByte_time"
          class="graph"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useWebSocketStore } from "@/stores";
import { ref, watchEffect, reactive, onMounted, onUnmounted } from "vue";
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
  setup(props) {
    const websocketStore = useWebSocketStore();

    const table_time_pkt_recv = ref(0);
    const table_time_pkt_send = ref(0);
    const table_time_data_recv = ref(0);
    const table_time_data_send = ref(0);

    const selectedGraph = ref("packets_time");
    const graphOptions = [
      { label: "Packet/sec", value: "packets_time" },
      { label: "Data/sec", value: "data_time" },
    ];

    const onGraphChange = () => {
      // 그래프 변경 시 수행할 로직 작성
    };

    let oldValue = {
      recv_data: 0,
      send_data: 0,
      recv_pkt: 0,
      send_pkt: 0,
    };
    let isFirstRun = true;

    watchEffect(() => {
      if (props.captureButtonState) {
        const newValue = websocketStore.statMessage;
        if (newValue.data && newValue.data.length > 0) {
          if (isFirstRun) {
            isFirstRun = false;
          } else {
            table_time_data_recv.value =
              newValue.data[0].stats.recv_data - oldValue.recv_data;
            table_time_data_send.value =
              newValue.data[0].stats.send_data - oldValue.send_data;
            table_time_pkt_recv.value =
              newValue.data[0].stats.recv_pkt - oldValue.recv_pkt;
            table_time_pkt_send.value =
              newValue.data[0].stats.send_pkt - oldValue.send_pkt;
          }

          oldValue = {
            recv_data: newValue.data[0].stats.recv_data,
            send_data: newValue.data[0].stats.send_data,
            recv_pkt: newValue.data[0].stats.recv_pkt,
            send_pkt: newValue.data[0].stats.send_pkt,
          };
        }
      } else {
        oldValue = {
          recv_data: 0,
          send_data: 0,
          recv_pkt: 0,
          send_pkt: 0,
        };
        isFirstRun = true;
      }
    });

    const updateInterval = 1000;

    const chartDataPacket_time = reactive({
      labels: Array(60).fill(""),
      datasets: [
        {
          label: "패킷 송신/초",
          data: Array(60).fill(0),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          borderWidth: 1,
          pointRadius: 0,
        },
        {
          label: "패킷 수신/초",
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
    const chartDataByte_time = reactive({
      labels: Array(60).fill(""),
      datasets: [
        {
          label: "데이터 송신/초",
          data: Array(60).fill(0),
          borderColor: "orange",
          backgroundColor: "rgba(255, 165, 0, 0.2)",
          fill: true,
          borderWidth: 1,
          pointRadius: 0,
        },
        {
          label: "데이터 수신/초",
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

    const initialPacketTimeYMin = -100;
    const initialPacketTimeYMax = 100;
    const initialByteTimeYMin = -1000;
    const initialByteTimeYMax = 1000;

    const chartOptionsPacket_time = reactive({
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
          min: initialPacketTimeYMin,
          max: initialPacketTimeYMax,
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
                label += ": ";
              }
              if (context.raw < 0) {
                label += Math.abs(context.raw);
              } else {
                label += context.raw;
              }
              label += " 개/초";
              return label;
            },
          },
        },
      },
    });

    const chartOptionsByte_time = reactive({
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
          min: initialByteTimeYMin,
          max: initialByteTimeYMax,
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
                label += ": ";
              }
              if (context.raw < 0) {
                label += Math.abs(context.raw);
              } else {
                label += context.raw;
              }
              label += " Byte/초";
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
        if (websocketStore.statMessage.data) {
          const maxPacketValue_time = Math.max(
            ...chartDataPacket_time.datasets[0].data,
            ...chartDataPacket_time.datasets[1].data.map(Math.abs)
          );
          const minPacketValue_time = Math.min(
            ...chartDataPacket_time.datasets[0].data,
            ...chartDataPacket_time.datasets[1].data.map(Math.abs)
          );

          const maxByteValue_time = Math.max(
            ...chartDataByte_time.datasets[0].data,
            ...chartDataByte_time.datasets[1].data.map(Math.abs)
          );
          const minByteValue_time = Math.min(
            ...chartDataByte_time.datasets[0].data,
            ...chartDataByte_time.datasets[1].data.map(Math.abs)
          );

          if (
            maxPacketValue_time > chartOptionsPacket_time.scales.y.max ||
            minPacketValue_time < Math.abs(chartOptionsPacket_time.scales.y.min)
          ) {
            const newMax = Math.ceil(maxPacketValue_time / 10) * 10;
            const newMin = -newMax;
            chartOptionsPacket_time.scales.y.max = newMax;
            chartOptionsPacket_time.scales.y.min = newMin;
          }

          if (
            maxByteValue_time > chartOptionsByte_time.scales.y.max ||
            minByteValue_time < Math.abs(chartOptionsByte_time.scales.y.min)
          ) {
            const newMax = Math.ceil(maxByteValue_time / 10) * 10;
            const newMin = -newMax;
            chartOptionsByte_time.scales.y.max = newMax;
            chartOptionsByte_time.scales.y.min = newMin;
          }

          const newChartDataPacket_time = {
            labels: [...chartDataPacket_time.labels.slice(1), ""],
            datasets: chartDataPacket_time.datasets.map((dataset, index) => {
              let newDataPoint = 0;
              switch (index) {
                case 0:
                  newDataPoint = table_time_pkt_send.value;
                  break;
                case 1:
                  newDataPoint = -table_time_pkt_recv.value;
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

          const newChartDataByte_time = {
            labels: [...chartDataByte_time.labels.slice(1), ""],
            datasets: chartDataByte_time.datasets.map((dataset, index) => {
              let newDataPoint = 0;
              switch (index) {
                case 0:
                  newDataPoint = table_time_data_send.value;
                  break;
                case 1:
                  newDataPoint = -table_time_data_recv.value;
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

          chartDataPacket_time.labels = newChartDataPacket_time.labels;
          chartDataPacket_time.datasets = newChartDataPacket_time.datasets;
          chartDataByte_time.labels = newChartDataByte_time.labels;
          chartDataByte_time.datasets = newChartDataByte_time.datasets;
        }
      }
    };

    return {
      table_time_pkt_recv,
      table_time_pkt_send,
      table_time_data_recv,
      table_time_data_send,
      chartDataPacket_time,
      chartDataByte_time,
      chartOptionsPacket_time,
      chartOptionsByte_time,
      selectedGraph,
      graphOptions,
      onGraphChange,
    };
  },
};
</script>

<style>
.card {
  height: 100%;
}
.graph-content {
  height: 100%;
}
.dashboard-graph {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.graph {
  height: 100%;
}

.dropdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
select {
  border: none;
  margin: 3px;
}
</style>
