<template>
  <div class="full-view">
    <div class="header-buttons-row">
      <HeaderStructure />
      <!-- 패널 숨김/표시 버튼 -->
      <div class="mt-3">
        <Button @click="togglePanel1">
          {{ showPanel1 ? "Hide" : "Show" }} Panel 1
        </Button>
        <Button @click="togglePanel3" class="ml-2">
          {{ showPanel3 ? "Hide" : "Show" }} Panel 3
        </Button>
        <Button @click="togglePanel4" class="ml-2">
          {{ showPanel4 ? "Hide" : "Show" }} Panel 4
        </Button>
        <Button @click="togglePanel5" class="ml-2">
          {{ showPanel5 ? "Hide" : "Show" }} Panel 5
        </Button>
      </div>
    </div>
    <div id="wrap-pktCapture-page" class="wrap-pktCapture-page">
      <div id="capturepage-container" style="height: 100%">
        <Splitter style="height: 100%; background-color: '#f8fafc'">
          <!-- 패널 1: 버튼으로 숨기거나 표시할 수 있음 & 사이드바(시작/중단버튼, 대시보드)-->
          <SplitterPanel
            v-if="showPanel1"
            class="flex align-items-center justify-content-center"
            :size="20"
            :minSize="10"
          >
            <div id="sidebar" class="sidebar">
              <div id="iot" class="iot">
                <!-- IoT 장비 연결하세요 -->
              </div>
              <div id="menu-button-bar" class="menu-button-bar">
                <MenuButton @capture-state-change="updateCaptureButtonState" />
              </div>
              <div id="dashboard" class="dashboard">
                <div id="dashboard-data" class="dashboard-data">
                  <DashboardData
                    :labelData1="'패킷 입력량'"
                    :labelData2="'패킷 출력량'"
                    :labelData3="'데이터 수신량'"
                    :labelData4="'데이터 송신량'"
                    :captureButtonState="captureButtonState"
                  />
                </div>
                <div id="dashboard-timedata" class="dashboard-timedata">
                  <DashboardTimeData
                    :labelData1="'패킷 입력량/초'"
                    :labelData2="'패킷 출력량/초'"
                    :labelData3="'데이터 수신량/초'"
                    :labelData4="'데이터 송신량/초'"
                    :captureButtonState="captureButtonState"
                  />
                </div>
              </div>
            </div>
          </SplitterPanel>
          <!-- 패널 1이 숨겨져 있을 때 남은  차지하는 패 -->
          <SplitterPanel :size="showPanel1 ? 80 : 100">
            <Splitter>
              <!-- 패널 5가 숨겨져 있을 때 남은 공간을 차지하는 패널 -->
              <SplitterPanel :size="showPanel5 ? 50 : 100">
                <Splitter layout="vertical">
                  <!-- 패널 2: 패널 3과 패널 4가 모두 숨겨져 있을 때 남은 공간을 차지함 & 패킷 리스트 출력-->
                  <SplitterPanel
                    class="flex align-items-center justify-content-center panel-scroll"
                    :size="showPanel3 || showPanel4 ? 50 : 100"
                  >
                    <div id="pkt-list" class="pkt-list">
                      <DataTable
                        :value="packetMessages"
                        id="listTable"
                        size="small"
                        showGridlines
                        scrollable
                        rowHover
                        title="패킷 정보"
                        @row-click="onRowClick"
                      >
                        <Column field="index" header="No."></Column>
                        <Column
                          field="seconds_since_beginning"
                          header="Time"
                        ></Column>
                        <Column field="source_ip" header="Source IP"></Column>
                        <Column
                          field="destination_ip"
                          header="Destination IP"
                        ></Column>
                        <Column field="name" header="Protocol"></Column>
                        <Column field="length" header="Len"></Column>
                        <Column field="type" header="Info"></Column>
                      </DataTable>
                    </div>
                  </SplitterPanel>

                  <!-- 패널 3과 패널 4를 감싸는 패널: 패널 3과 패널 4가 모두 숨겨져 있을 때 제거됨 -->
                  <SplitterPanel v-if="showPanel3 || showPanel4" :size="50">
                    <Splitter>
                      <!-- 패널 3: 버튼으로 숨기거나 표시할 수 있음 & 다이어그램 패널-->
                      <SplitterPanel
                        v-if="showPanel3"
                        class="flex align-items-center justify-content-center panel-scroll"
                        :size="showPanel4 ? 20 : 100"
                      >
                        <div v-if="selectedPacket">
                          <PacketDiagram :pkt="selectedPacket" />
                        </div>
                        <div v-else>
                          <p>선택된 패킷이 없습니다.</p>
                        </div>
                      </SplitterPanel>

                      <!-- 패널 4: 버튼으로 숨기거나 표시할 수 있음 & raw-data 출력 할 예정-->
                      <SplitterPanel
                        v-if="showPanel4"
                        class="flex align-items-center justify-content-center"
                        :size="showPanel3 ? 80 : 100"
                      >
                        Panel 4
                      </SplitterPanel>
                    </Splitter>
                  </SplitterPanel>
                </Splitter>
              </SplitterPanel>

              <!-- 패널 5: 버튼으로 숨기거나 표시할 수 있음 & 플로우차트 표현 -->
              <SplitterPanel
                v-if="showPanel5"
                class="flex align-items-center justify-content-center panel-scroll"
                :size="50"
              >
                <div>
                  <FlowchartPage
                    :flowchart_packets="flowchart_packets"
                    :rowIndex="clickedRowIndex"
                    :sourceIP="sourceIP"
                    :destinationIP="destinationIP"
                  />
                </div>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
    <FooterStructure />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
// 비동기적으로 컴포넌트를 로드하면, 해당 컴포넌트가 실제로 렌더링되기 전까지는 로드되지 않습니다. 이는 초기 번들 크기를 줄이고 애플리케이션의 초기 로딩 속도를 개선하는 데 도움
// 컴포넌트를 동기적으로 가져오면(import IotPrint from '../components/IotPrint.vue'), 해당 컴포넌트 코드는 번들에 포함되어 초기 로딩 시 함께 로드됩니다. 이는 번들 크기를 증시키고 초기 로딩 도를 저하
import { ref, computed, watch } from "vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Button from "primevue/button";
import HeaderStructure from "../components/HeaderStructure.vue";
import FooterStructure from "../components/FooterStructure.vue";
import { useWebSocketStore } from "@/store";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const websocketStore = useWebSocketStore();
const packetMessages = computed(() => websocketStore.packetMessages);

// const IotPrint = defineAsyncComponent(() =>
//   import("../components/IotPrint.vue")
// );
const MenuButton = defineAsyncComponent(() =>
  import("../components/MenuButton.vue")
);
const DashboardData = defineAsyncComponent(() =>
  import("../components/DashboardData.vue")
);
const DashboardTimeData = defineAsyncComponent(() =>
  import("../components/DashboardTimeData.vue")
);
const PacketDiagram = defineAsyncComponent(() =>
  import("../components/PacketDiagram.vue")
);
const FlowchartPage = defineAsyncComponent(() => import("./FlowchartPage.vue"));

// 각 패널의 숨김/표시 상태를 저장하는 반응형 변수
const showPanel1 = ref(true);
const showPanel3 = ref(false);
const showPanel4 = ref(false);
const showPanel5 = ref(false);

// 패널 1 숨김/표시 토글 함수
const togglePanel1 = () => {
  showPanel1.value = !showPanel1.value;
};

// 패널 3 숨김/표시 토글 함수
const togglePanel3 = () => {
  showPanel3.value = !showPanel3.value;
};

// 패널 4 숨김/표시 토글 함수
const togglePanel4 = () => {
  showPanel4.value = !showPanel4.value;
};

// 패널 5 숨김/표시 토글 함수
const togglePanel5 = () => {
  showPanel5.value = !showPanel5.value;
};

// packetMessages가 변경될 때 실행될 watch
// 중단 - 시작 버튼 누를때 패널3,4,5 닫기 위함
watch(packetMessages, (newVal) => {
  if (newVal.length === 0) {
    showPanel3.value = false;
    showPanel4.value = false;
    showPanel5.value = false;
  }
});

const captureButtonState = ref(false);

const updateCaptureButtonState = (state) => {
  captureButtonState.value = state;
};

// 클릭 상태를 저장하는 변수
// 두번클릭시 한번클릭하는것 이벤트 막기위함
const lastClickTime = ref(0);
const doubleClickThreshold = 300; // 더 클릭 간격 임계값 (밀리초)

const onRowClick = (event) => {
  const currentTime = Date.now();
  const timeSinceLastClick = currentTime - lastClickTime.value;

  if (timeSinceLastClick < doubleClickThreshold) {
    // 더블 클릭으로 처리
    handleDoubleClick(event);
    lastClickTime.value = 0; // 더블 클릭 후 시간 초기화
  } else {
    // 싱글 클릭으로 처리 (더블 클릭 임계값 이후)
    // 싱글 클릭 처리를 예약
    setTimeout(() => {
      if (currentTime === lastClickTime.value) {
        handleSingleClick(event);
      }
    }, doubleClickThreshold);
    lastClickTime.value = currentTime;
  }
};

// 다이어그램
const selectedPacket = ref(null);

const handleSingleClick = (event) => {
  // 싱글 클릭 로직
  console.log("싱글 클릭 처리");
  if (!showPanel3.value) {
    showPanel3.value = true;
  }
  selectedPacket.value = event.data;
  console.log("Selected Packet:", selectedPacket);
};

// 플로우차트
const flowchart_packets = ref(null);
const clickedRowIndex = ref(null); // 클릭된 행의 인덱스를 저장하기 위한 반응형 참조
const sourceIP = ref(null);
const destinationIP = ref(null);
const handleDoubleClick = (event) => {
  // 더블 클릭 로직
  clickedRowIndex.value = event.index; // 클릭한 행의 번호 저장
  sourceIP.value = event.data.source_ip;
  destinationIP.value = event.data.destination_ip;

  // 더블 클릭 시점의 packetMessages 데이터를 flowchart_packets에 할당
  flowchart_packets.value = packetMessages.value;

  showPanel5.value = true; // 패널 5를 보여줍니다.
  FlowchartPage.value = {
    flowchart_packets: flowchart_packets.value,
    rowIndex: clickedRowIndex.value,
    sourceIP: sourceIP.value,
    destinationIP: destinationIP.value,
  };
  console.log("더블클릭 이벤트 처리");
  console.log("Flowchart Packets:", flowchart_packets.value);
};
</script>

<style>
.header-buttons-row {
  display: flex;
  flex-direction: row;
}
.full-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f8fafc;
}
HeaderStructure {
  height: 50px;
}
FooterStructure {
  height: 21.6px;
}
.pkt-list {
  /* border-radius: 5px; */
  /* min-width: 805px; */
}
.dashboard {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.dashboard-data,
.dashboard-timedata {
  height: 50%; /* 부모 요소인 .dashboard의 높이를 기준으로 50% */
  margin-top: 5px;
  border-radius: 5px;
  /* background-color: white; */
  display: flex;
  flex-direction: column;
}
.menu-button-bar {
  flex: 0 0 40px; /* flex-grow, flex-shrink, flex-basis */
  margin-top: 5px;
}
.iot {
  flex: 0 0 41px; /* flex-grow, flex-shrink, flex-basis */
  /* background-color: white; */
  margin-bottom: 1%;
  border-radius: 5px;
}
.wrap-pktCapture-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* padding: 1.5vh; */
}
.sidebar {
  display: flex;
  flex-direction: column;
  width: auto;
  min-width: 285px;
  height: 100%;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.dashboard-data thead {
  display: none;
}

body {
  margin: 0;
  box-sizing: border-box;
}
.panel-scroll {
  overflow: auto;
}
</style>
