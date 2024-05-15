<template>
  <div>
    <div class="dashboard-table">
      패킷 송신/초:<br />
      <span>{{ table_time_pkt_send }}</span>
    </div>
    <div class="dashboard-table">
      패킷 수신/초:<br />
      <span>{{ table_time_pkt_recv }}</span>
    </div>
    <div class="dashboard-table">
      데이터 송신/초:<br />
      <span>{{ table_time_data_send }}</span>
    </div>
    <div class="dashboard-table">
      데이터 수신/초:<br />
      <span>{{ table_time_data_recv }}</span>
    </div>
    <div class="dashboard-graph">
      <div class="tab-buttons">
        <button
          :class="{ active: currentTab === 'packets_time' }"
          @click="currentTab = 'packets_time'"
        >
          Packet/sec
        </button>
        <button
          :class="{ active: currentTab === 'data_time' }"
          @click="currentTab = 'data_time'"
        >
          Data/sec
        </button>
        <button
          :class="{ active: currentTab === 'all_time' }"
          @click="currentTab = 'all_time'"
        >
          All/sec
        </button>
      </div>
      <div class="tab-content">
        <div v-if="currentTab === 'packets_time'" class="card">
          <Chart
            type="line"
            :data="chartDataPacket_time"
            :options="chartOptions"
            class="graph"
          />
        </div>
        <div v-if="currentTab === 'data_time'" class="card">
          <Chart
            type="line"
            :data="chartDataByte_time"
            :options="chartOptions"
            class="graph"
          />
        </div>
        <div v-if="currentTab === 'all_time'" class="card">
          <Chart
            type="line"
            :data="chartData_time"
            :options="chartOptions"
            class="graph"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useWebSocketStore } from "../store/websocketStore";
import { ref, watch, reactive, onMounted, onUnmounted } from "vue";
import Chart from "primevue/chart";

export default {
  components: {
    Chart,
  },
  data() {
    return {
      currentTab: "packets_time", // 현재 선택된 탭 인덱스
    };
  },
  setup() {
    const websocketStore = useWebSocketStore();

    // 각각의 패킷 및 데이터 송/수신 정보를 저장하는 ref를 생성합니다.
    const table_time_pkt_recv = ref(0);
    const table_time_pkt_send = ref(0);
    const table_time_data_recv = ref(0);
    const table_time_data_send = ref(0);

    // 웹소켓 스토어의 statMessage가 변경될 때마다 실행되는 watch 함수를 설정합니다.
    watch(
      () => websocketStore.statMessage,
      (newValue) => {
        // 새로운 값이 있고, 그 값에 total_statistics가 있는 경우
        if (newValue && newValue.statistics_delta) {
          table_time_pkt_recv.value = newValue.statistics_delta.send_pkt;
          table_time_pkt_send.value = newValue.statistics_delta.recv_pkt;
          table_time_data_recv.value = newValue.statistics_delta.send_data;
          table_time_data_send.value = newValue.statistics_delta.recv_data;
        }
      }
    );

    // 데이터 갱신 간격 (밀리초)
    const updateInterval = 1000;

    // 초기 차트 데이터 설정
    const chartData_time = reactive({
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          label: "패킷 송신/초",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "cyan",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "패킷 수신/초",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "gray",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "데이터 송신/초",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "orange",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "데이터 수신/초",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "pink",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
      ],
    });
    const chartDataPacket_time = reactive({
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          label: "패킷 송신/초",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "cyan",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "패킷 수신/초",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "gray",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
      ],
    });
    const chartDataByte_time = reactive({
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          label: "데이터 송신/초",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "orange",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "데이터 수신/초",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "pink",
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
      animation: false,
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
      // staticsDelta 객체 확인
      if (websocketStore.statMessage.statistics_delta) {
        const { send_pkt, recv_pkt, send_data, recv_data } =
          websocketStore.statMessage.statistics_delta;

        // 새로운 데이터 추가
        const newChartData_time = {
          labels: [...chartData_time.labels.slice(1), ""],
          datasets: chartData_time.datasets.map((dataset, index) => {
            let newDataPoint_time = 0;
            // index에 따라 데이터 설정
            switch (index) {
              case 0:
                newDataPoint_time = send_pkt;
                break;
              case 1:
                newDataPoint_time = recv_pkt;
                break;
              case 2:
                newDataPoint_time = send_data;
                break;
              case 3:
                newDataPoint_time = recv_data;
                break;
              default:
                break;
            }
            return {
              ...dataset,
              data: [...dataset.data.slice(1), newDataPoint_time],
            };
          }),
        };

        const newChartDataPacket_time = {
          labels: [...chartDataPacket_time.labels.slice(1), ""],
          datasets: chartDataPacket_time.datasets.map((dataset, index) => {
            let newDataPoint_time = 0;
            // index에 따라 데이터 설정
            switch (index) {
              case 0:
                newDataPoint_time = send_pkt;
                break;
              case 1:
                newDataPoint_time = recv_pkt;
                break;
              default:
                break;
            }
            return {
              ...dataset,
              data: [...dataset.data.slice(1), newDataPoint_time],
            };
          }),
        };

        const newChartDataByte_time = {
          labels: [...chartDataByte_time.labels.slice(1), ""],
          datasets: chartDataByte_time.datasets.map((dataset, index) => {
            let newDataPoint_time = 0;
            // index에 따라 데이터 설정
            switch (index) {
              case 0:
                newDataPoint_time = send_data;
                break;
              case 1:
                newDataPoint_time = recv_data;
                break;
              default:
                break;
            }
            return {
              ...dataset,
              data: [...dataset.data.slice(1), newDataPoint_time],
            };
          }),
        };

        // 데이터 반영
        chartData_time.labels = newChartData_time.labels;
        chartData_time.datasets.forEach((dataset, i) => {
          dataset.data = newChartData_time.datasets[i].data;
        });

        // 데이터 반영
        chartDataPacket_time.labels = newChartDataPacket_time.labels;
        chartDataPacket_time.datasets.forEach((dataset, i) => {
          dataset.data = newChartDataPacket_time.datasets[i].data;
        });

        chartDataByte_time.labels = newChartDataByte_time.labels;
        chartDataByte_time.datasets.forEach((dataset, i) => {
          dataset.data = newChartDataByte_time.datasets[i].data;
        });
      }
    };

    // 각각의 ref를 반환하여 템플릿에서 사용할 수 있게 합니다.
    return {
      table_time_pkt_recv,
      table_time_pkt_send,
      table_time_data_recv,
      table_time_data_send,
      chartData_time,
      chartOptions,
      chartDataPacket_time,
      chartDataByte_time,
    };
  },
};
</script>
