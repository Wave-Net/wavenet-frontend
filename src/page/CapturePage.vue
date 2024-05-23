<template>
  <div class="full-view">
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
    <div id="wrap-pktCapture-page" class="wrap-pktCapture-page">
      <div id="capturepage-container" style="height: 100%">
        <Splitter style="height: 100%">
          <!-- 패널 1: 버튼으로 숨기거나 표시할 수 있음 -->
          <SplitterPanel
            v-if="showPanel1"
            class="flex align-items-center justify-content-center"
            :size="20"
            :minSize="10"
          >
            Panel 1
          </SplitterPanel>

          <!-- 패널 1이 숨겨져 있을 때 남은 공간을 차지하는 패널 -->
          <SplitterPanel :size="showPanel1 ? 80 : 100">
            <Splitter>
              <!-- 패널 5가 숨겨져 있을 때 남은 공간을 차지하는 패널 -->
              <SplitterPanel :size="showPanel5 ? 50 : 100">
                <Splitter layout="vertical">
                  <!-- 패널 2: 패널 3과 패널 4가 모두 숨겨져 있을 때 남은 공간을 차지함 -->
                  <SplitterPanel
                    class="flex align-items-center justify-content-center"
                    :size="showPanel3 || showPanel4 ? 50 : 100"
                  >
                    Panel 2
                  </SplitterPanel>

                  <!-- 패널 3과 패널 4를 감싸는 패널: 패널 3과 패널 4가 모두 숨겨져 있을 때 제거됨 -->
                  <SplitterPanel v-if="showPanel3 || showPanel4" :size="50">
                    <Splitter>
                      <!-- 패널 3: 버튼으로 숨기거나 표시할 수 있음 -->
                      <SplitterPanel
                        v-if="showPanel3"
                        class="flex align-items-center justify-content-center"
                        :size="showPanel4 ? 20 : 100"
                      >
                        Panel 3
                      </SplitterPanel>

                      <!-- 패널 4: 버튼으로 숨기거나 표시할 수 있음 -->
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

              <!-- 패널 5: 버튼으로 숨기거나 표시할 수 있음 -->
              <SplitterPanel
                v-if="showPanel5"
                class="flex align-items-center justify-content-center"
                :size="50"
              >
                Panel 5
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
// 컴포넌트를 동기적으로 가져오면(import IotPrint from '../components/IotPrint.vue'), 해당 컴포넌트 코드는 번들에 포함되어 초기 로딩 시 함께 로드됩니다. 이는 번들 크기를 증가시키고 초기 로딩 속도를 저하
import { ref } from "vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Button from "primevue/button";
import HeaderStructure from "../components/HeaderStructure.vue";
import FooterStructure from "../components/FooterStructure.vue";

const IotPrint = defineAsyncComponent(() =>
  import("../components/IotPrint.vue")
);
const MenuButton = defineAsyncComponent(() =>
  import("../components/MenuButton.vue")
);
const DashboardData = defineAsyncComponent(() =>
  import("../components/DashboardData.vue")
);
const DashboardTimeData = defineAsyncComponent(() =>
  import("../components/DashboardTimeData.vue")
);
const PacketList = defineAsyncComponent(() =>
  import("../components/PacketList.vue")
);
const HeaderTemplate = defineAsyncComponent(() =>
  import("@/components/Header_template.vue")
);

// 각 패널의 숨김/표시 상태를 저장하는 반응형 변수
const showPanel1 = ref(true);
const showPanel3 = ref(true);
const showPanel4 = ref(true);
const showPanel5 = ref(true);

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
</script>

<style>
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
  margin-left: 5px;
  background-color: whitesmoke;
  border-radius: 5px;
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
  background-color: white;
  display: flex;
  flex-direction: column;
}
.menu-button-bar {
  flex: 0 0 40px; /* flex-grow, flex-shrink, flex-basis */
  margin-top: 5px;
}
.iot {
  flex: 0 0 41px; /* flex-grow, flex-shrink, flex-basis */
  background-color: white;
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
  width: 370px;
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
</style>
