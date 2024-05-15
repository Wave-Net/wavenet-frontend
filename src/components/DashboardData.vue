##그래프랑 테이블 합친 코드

<template>
  <div>
    <div class="dashboard-table">
      패킷 송신:
      <span>{{ table_pkt_send }}</span>
    </div>
    <div class="dashboard-table">
      패킷 수신:
      <span>{{ table_pkt_recv }}</span>
    </div>
    <div class="dashboard-table">
      데이터 송신:
      <span>{{ table_data_send }}</span>
    </div>
    <div class="dashboard-table">
      데이터 수신:
      <span>{{ table_data_recv }}</span>
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
        <button
          :class="{ active: currentTab === 'all' }"
          @click="currentTab = 'all'"
        >
          All
        </button>
      </div>
      <div class="tab-content">
        <div v-if="currentTab === 'packets'" class="card">
          Packet_info
          <Chart
            type="line"
            :data="chartData"
            :options="chartOptions"
            class="graph"
          />
        </div>
        <div v-if="currentTab === 'data'" class="card">
          Data_info
          <Chart
            type="line"
            :data="chartData"
            :options="chartOptions"
            class="graph"
          />
        </div>
        <div v-if="currentTab === 'all'" class="card">
          All_info
          <Chart
            type="line"
            :data="chartData"
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
      currentTab: "packets", // 현재 선택된 탭 인덱스
    };
  },
  setup() {
    const websocketStore = useWebSocketStore();

    // 각각의 패킷 및 데이터 송/수신 정보를 저장하는 ref를 생성합니다.
    const table_pkt_recv = ref(0);
    const table_pkt_send = ref(0);
    const table_data_recv = ref(0);
    const table_data_send = ref(0);

    // 웹소켓 스토어의 statMessage가 변경될 때마다 실행되는 watch 함수를 설정합니다.
    watch(
      () => websocketStore.statMessage,
      (newValue) => {
        // 새로운 값이 있고, 그 값에 total_statistics가 있는 경우
        if (newValue && newValue.total_statistics) {
          table_pkt_recv.value = newValue.total_statistics.send_pkt;
          table_pkt_send.value = newValue.total_statistics.recv_pkt;
          table_data_recv.value = newValue.total_statistics.send_data;
          table_data_send.value = newValue.total_statistics.recv_data;
        }
      }
    );

    // 데이터 갱신 간격 (밀리초)
    const updateInterval = 1000;

    // 초기 차트 데이터 설정
    const chartData = reactive({
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          label: "패킷 송신",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "cyan",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "패킷 수신",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "gray",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "데이터 송신",
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "orange",
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "데이터 수신",
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
      if (websocketStore.statMessage.total_statistics) {
        const { send_pkt, recv_pkt, send_data, recv_data } =
          websocketStore.statMessage.total_statistics;

        // 새로운 데이터 추가
        const newChartData = {
          labels: [...chartData.labels.slice(1), ""],
          datasets: chartData.datasets.map((dataset, index) => {
            let newDataPoint = 0;
            // index에 따라 데이터 설정
            switch (index) {
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
              data: [...dataset.data.slice(1), newDataPoint],
            };
          }),
        };

        // 데이터 반영
        chartData.labels = newChartData.labels;
        chartData.datasets = newChartData.datasets;
      }
    };

    // 각각의 ref를 반환하여 템플릿에서 사용할 수 있게 합니다.
    return {
      table_pkt_recv,
      table_pkt_send,
      table_data_recv,
      table_data_send,
      chartData,
      chartOptions,
    };
  },
};
</script>

<style>
.dashboard-table {
  background-color: white;
  margin-top: 5px;
  text-align: center;
}
.graph {
  height: 100%;
}

.tab-buttons button {
  background-color: #e5f3f6;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  width: 33.33%;
}

.tab-buttons button.active {
  background-color: #bfe4e8;
}
</style>
