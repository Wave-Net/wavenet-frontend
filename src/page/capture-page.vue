<template>
  <div id="wrap-pktCapture-page" class="wrap-pktCapture-page">
    <div id="sidebar" class="sidebar">
      <div id="iot" class="iot">
        <IotPrint />
      </div>
      <div id="menu-button-bar" class="menu-button-bar">
        <MenuButton />
      </div>
      <div id="dashboard" class="dashboard">
        <div id="dashboard-data" class="dashboard-data">
          <DashboardData
            :labelData1="'패킷 입력량'"
            :labelData2="'패킷 출력량'"
            :labelData3="'데이터 수신량'"
            :labelData4="'데이터 송신량'"
          />
        </div>
        <div id="dashboard-timedata" class="dashboard-timedata">
          <DashboardTimeData
            :labelData1="'패킷 입력량/초'"
            :labelData2="'패킷 출력량/초'"
            :labelData3="'데이터 수신량/초'"
            :labelData4="'데이터 송신량/초'"
          />
        </div>
      </div>
    </div>
    <div id="container" class="container">
      <div id="pkt-list" class="pkt-list">
        <PacketList />
      </div>
    </div>
  </div>
</template>

<script>
import IotPrint from "../components/IotPrint.vue";
import MenuButton from "../components/MenuButton.vue";
import DashboardData from "../components/DashboardData.vue";
import DashboardTimeData from "../components/DashboardTimeData.vue";
import PacketList from "../components/PacketList.vue";

export default {
  components: {
    IotPrint,
    MenuButton,
    DashboardData,
    DashboardTimeData,
    PacketList,
  },
};
</script>

<style>
.pkt-list {
  margin-left: 5px;
  background-color: whitesmoke;
  border-radius: 5px;
}
.dashboard {
  flex-grow: 1; /* 남은 공간을 채우도록 설정 */
}
.dashboard-data,
.dashboard-timedata {
  height: 50%; /* 부모 요소인 .dashboard의 높이를 기준으로 50% */
  margin-top: 5px;
  border-radius: 5px;
  background-color: white;
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
  height: 100vh;
  background-color: #f0f8ff;
  padding: 1.5vh;
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
