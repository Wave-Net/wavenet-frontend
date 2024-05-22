<template>
  <div>
    <Menubar :model="menuItems" class="menubar">
      <template #start>
        <div>
          <img
            alt="logo"
            src="https://i.ibb.co/X2BdhfP/Kakao-Talk-20240510-171615462.png"
            height="25.6"
            class="mr-2"
          />
        </div>
      </template>
    </Menubar>
  </div>
  <div class="title_space">
  <div class="time_title">시간</div>
  <div class="source_title">Source</div>
  <div class="destination_title">Destination</div>
</div>
  <hr class="bottom-border">
  <div class="timeline-container">
    <div class="left-timeline">
      <h2 class="timeline-title-left">{{ packetData.length > 0 ? packetData[0].source_ip : 'No data available' }}</h2>
      <Timeline class="left-timeline" :value="leftEvents">
        <template #opposite="slotProps">
          <small class="p-text-secondary">{{ slotProps.item.date }}</small>
        </template>
      </Timeline>
    </div>

    <!-- 추가된 가로선과 텍스트 -->
    <div class="timeline-space">
      <div
        class="line-container"
        v-for="(packet, index) in packetData" :key="index"
      >
        <hr class="horizontal-line" />
        <div class="horizontal-line-text">{{ packet.type }}</div>
        <svg :class="{'right-arrow': packet.source_ip === packetData[0].source_ip, 'left-arrow': packet.source_ip !== packetData[0].source_ip}" viewBox="0 0 20 20">
    <path d="M0 10 L20 10 L10 0 L10 20 Z" />
        </svg>
        
      </div>
    </div>
    <!-- 추가된 가로선과 텍스트 -->

    <div class="right-timeline">
      <h2 class="timeline-title-right">{{ packetData.length > 0 ? packetData[0].destination_ip : 'No data available' }}</h2>
      <Timeline class="right-timeline" :value="rightEvents"></Timeline>
    </div>
  </div>

</template>

<script>
import Timeline from "primevue/timeline";
import Menubar from "primevue/menubar";
import { ref, onMounted, watch } from "vue";


export default {
  components: {
    Timeline,
    Menubar,
  },
  setup() {


const leftEvents = ref([
  
]);

const rightEvents = ref([
  
]);

const menuItems = ref([
  {
    label: "IoT기기",
  },
  {
    label: "Public IP",
  },
  {
    label: "Private IP",
  },
]);

const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};


    const packetData = ref([]);

    onMounted(() => {
      
        const localStorageData = getFromLocalStorage("filteredPackets");
        if (localStorageData) {
          packetData.value = localStorageData;
          console.log("Packet data from localStorage:", packetData.value);
        } else {
          console.log("No packet data available in localStorage.");
        }
    });

    watch(packetData, (newValue,) => {
      // packetData가 변경될 때마다 새로운 타임라인을 추가
      for (let i = 0; i < newValue.length; i++) {
        leftEvents.value.push({ date: newValue[i].seconds_since_beginning, status: newValue[i].status });
        rightEvents.value.push({ status: newValue[i].status });
      }
    });
    
return { leftEvents, rightEvents, menuItems, packetData};
},
};
</script>

<style scoped>
.menubar img {
  display: block;
  margin: 0 auto;
}

.timeline-title-left {
  text-align: center; /* 제목 가운데 정렬 */
  font-size: 12px;
  margin-top: 2px; /* 제목과 타임라인 간격 조정 */
  position: absolute;
  top: -22px; /* 타임라인 위에 위치 */
  left: 70%; /* 가운데 정렬 */
  color: #999999;
}

.timeline-title-right {
  text-align: center; /* 제목 가운데 정렬 */
  font-size: 12px;
  margin-top: 2px; /* 제목과 타임라인 간격 조정 */
  position: absolute;
  top: -22px; /* 타임라인 위에 위치 */
  left: -45%; /* 가운데 정렬 */
  color: #999999;
}

.left-timeline,
.right-timeline {
  position: relative;
}

.timeline-container {
  display: flex;
  justify-content: space-between;
}

.line-container {
  position: relative; /* 추가된 부분 */
}

.left-timeline >>> .p-timeline-event-opposite {
  padding-right: 60px;
  padding-left: 30px;
  display: flex;
  align-items: flex-start; /* 상단 정렬 */
}

.left-timeline >>> .p-timeline-event-content {
  display: none;
}

.right-timeline >>> .p-timeline-event-opposite {
  display: none;
}

.right-timeline >>> .p-timeline-event-content {
  padding: 25px;
}

.timeline-space {
  flex: 1;
  align-items: center;
  width: 100%;
}

.horizontal-line {
  width: 100%;
  border-top: 1px solid #999999;
  border-bottom: none;
  margin-bottom: 5px;
  position: relative;
  z-index: 1; /* 수정된 부분 */
}

.horizontal-line-text {
  font-size: 12px;
  font-weight: bold;
  color: #999999;
  text-align: center;
  margin-bottom: 48.2px;
}

.right-arrow {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #999999;
  position: absolute;
  left: calc(100% - 5px);
  top: -4.8px;
}

.left-arrow {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #999999;
  position: absolute;
  left: calc(10 - 5px);
  top: -4.8px;
  transform: scaleX(-1);
}

.title_space {
  height: 30px; /* 빈 공간의 세로 폭 설정 */
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
}

.time_title,
.source_title,
.destination_title {
  display: inline-block;
  color: #999999;
}
.time_title {
  width: 110px;
  text-align: center;
}

.source_title {
width: 90px;
text-align: center;

}

.destination_title{
  text-align: right;
  width: calc(100% - 220px);
}

.bottom-border {
  border-top: 1px solid #dee2e6; /* 하단 경계선 스타일 */
  margin-bottom: 30px; /* 하단 여백 추가 */
  margin-top: 0px;
}
</style>
