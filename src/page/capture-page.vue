<template>
  <div id="wrap-pktCapture-page" class="wrap-pktCapture-page">
    <div id="sidebar" class="sidebar">
      <div id="iot" class="iot">
        <IotPrint />
      </div>
      <div id="menu-button-bar" class="menu-button-bar">
        <MenuButton />
      </div>
      <div id="dashboard-graph" class="dashboard-graph">
        <!-- <DashboardGraph /> -->
      </div> <!--label넣기-->
      <div id="dashboard-data" class="dashboard-data">
        <DashboardData />
      </div>
      <div id="dashboard-timedata" class="dashboard-timedata">
        <DashboardTimeData />
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
// import DashboardGraph from '../components/DashboardGraph.vue';
import DashboardData from '../components/DashboardData.vue';
import DashboardTimeData from '../components/DashboardTimeData.vue';
import PacketList from '../components/PacketList.vue';

export default {
  components: {
    IotPrint,
    MenuButton,
    // DashboardGraph,
    DashboardData,
    DashboardTimeData,
    PacketList,
  },
};
</script>

<style>
.pkt-list{
  margin-left: 5px;
  background-color: whitesmoke;
  border-radius: 5px;
}
.dashboard-data {
  box-sizing: border-box;
  height: 153.6px;
  margin-top: 5px;
  border-radius: 5px;
}
.dashboard-timedata{
  box-sizing: border-box;
  height: 153.6px;
  margin-top: 5px;
  border-radius: 5px;
}
.dashboard-graph{
  box-sizing: border-box;
  height: auto;
  background-color: white;
  margin-top: 5px;
  border-radius: 5px;
}
.menu-button-bar{
  box-sizing: border-box;
  height: 40px;
  /* background-color: white; */
  margin-top: 5px;
}
.iot{
  box-sizing: border-box;
  height: 41px;
  background-color: white;
  margin-bottom: 1%;
  border-radius: 5px;
}
.wrap-pktCapture-page{
  display: flex; 
  height: 100vh;
  background-color: #F0F8FF;
  padding: 1.5vh;
}
.sidebar{
  width: 370px;
  min-width: 285px;
  height: 100%;
  box-sizing: border-box;
}
.container{
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
