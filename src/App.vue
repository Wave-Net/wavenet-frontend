<!-- //기본적인 페이지 구조를 정의 -->
<template>
  <Splitter style="height:95vh">
    <SplitterPanel class="panel1Menubar" size="10">
      <Splitter layout="vertical">
        <SplitterPanel class="panel1Iotaddress" size="1">
          <IotPrint />
        </SplitterPanel>
        <SplitterPanel class="panel2Buttonbar" size="1">
          <MenuButton />
        </SplitterPanel>
        <SplitterPanel class="panel3Dashboardchart" size="98">
          <Splitter style="height:auto" layout="vertical">
            <SplitterPanel class="panel3-1Graph" size="20">
              <!-- 패널 3-1) 선그래프 -->
              <DashboardGraph :labelData1="'초당 패킷 입력량'" :labelData2="'초당 패킷 출력량'"/>
              
            </SplitterPanel>
            <SplitterPanel class="panel3-1Graph" size="20">
              <DashboardGraph :labelData1="'초당 데이터 입력량'" :labelData2="'초당 데이터 출력량'"/>
            </SplitterPanel>
            <SplitterPanel class="panel3-2Data" size="30">
              <!-- 패널 3-2) 송수신된 데이터의 값 -->
              <DashboardData />
            </SplitterPanel>
            <SplitterPanel class="panel3-3Time" size="30">
              <!-- 패널 3-3) 송수신된 데이터의 1초당 데이터 값 -->
              <DashboardTimeData />
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </SplitterPanel>
    <SplitterPanel class="panel 4 pktlist" size="90">
      <PacketList />
    </SplitterPanel>
  </Splitter>
</template>

<script>
import IotPrint from "./components/IotPrint.vue";
import MenuButton from "./components/MenuButton.vue";
import DashboardGraph from './components/DashboardGraph.vue';
import DashboardData from './components/DashboardData.vue';
import DashboardTimeData from './components/DashboardTimeData.vue';
import PacketList from './components/PacketList.vue';

import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";

export default {
  components: {
    IotPrint,
    MenuButton,
    DashboardGraph,
    DashboardData,
    DashboardTimeData,
    PacketList,
    Splitter,
    SplitterPanel,
  },
};
</script>

<style>
.panel1Menubar {
  margin: 2.5px;
  /* border: 0.1px solid black; */
  width: 10px;
  min-width: 323px;
}

.panel1Iotaddress {
  /* border: 0.1px solid black; */
  min-height: 42px;
}

.panel2Buttonbar {
  /* border: 0.1px solid black; */
  min-height: 50px;
}

.panel3Dashboardchart {
  /* border: 0.11px solid black; */
  min-height: 499px;
}

.panel3-1Graph {
  min-height: 20%;
}

.panel3-2Data {
  height: auto;
  min-height: 145px;
}

.panel3-3Time {
  height: auto;
  min-height: 145px;
}
</style>