<template>
   <div>
      <Menubar :model="menuItems" class="menubar">
        <template #start>
          <div>
            <img alt="logo" src="https://i.ibb.co/X2BdhfP/Kakao-Talk-20240510-171615462.png" height="25.6" class="mr-2">
          </div>
        </template>
      </Menubar>
    </div>
    <div class="timeline-container">
    <div class="left-timeline">
      <h2 class="timeline-title-left">192.168.123.132</h2>
      <Timeline class="left-timeline" :value="leftEvents">
        <template #opposite="slotProps">
          <small class="p-text-secondary">{{ slotProps.item.date }}</small>
        </template>
      </Timeline>
    </div>
  
      <!-- 추가된 가로선과 텍스트 -->
      <div class="timeline-space">
  <div class="line-container" v-for="index in leftEvents.length" :key="index">
    <hr class="horizontal-line">
    <div class="horizontal-line-text">Your text here</div>
    <svg class="right-arrow" viewBox="0 0 20 20">
      <path d="M0 10 L20 10 L10 0 L10 20 Z" />
    </svg>
    <svg class="left-arrow" viewBox="0 0 20 20">
      <path d="M0 10 L20 10 L10 0 L10 20 Z" />
    </svg>
  </div>
</div>
      <!-- 추가된 가로선과 텍스트 -->
  
      <div class="right-timeline">
        <h2 class="timeline-title-right">192.168.123.132</h2>
  <Timeline class="right-timeline" :value="rightEvents"></Timeline>
</div>
    </div>
  </template>
  
  <script>
  import Timeline from 'primevue/timeline';
  import { ref } from 'vue';
  import Menubar from "primevue/menubar";

  export default {
    components: {
      Timeline,
      Menubar,
    },
    setup() {
      const leftEvents = ref([
        { date: '2024-05-13', status: '' },
        { date: '2024-05-14', status: '' },
        { date: '2024-05-15', status: '' },
        
        // Add more left events as needed
      ]);
  
      const rightEvents = ref([
        { status: 'Some status 1 (Right)' },
        { status: 'Some status 2 (Right)' },
        { status: 'Some status 3 (Right)' },
        // Add more right events as needed
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

      return { leftEvents, rightEvents, menuItems };
    }
  };
  </script>
  
  <style scoped>
.menubar img {
  display: block;
  margin: 0 auto;
}

.menubar {
  margin-bottom: 30px; /* 여백 크기는 필요에 따라 조정하세요 */
}

.timeline-title-left {
    text-align: center; /* 제목 가운데 정렬 */
    font-size: 12px;
    margin-top: 2px; /* 제목과 타임라인 간격 조정 */
    position: absolute;
    top: -10%; /* 타임라인 위에 위치 */
    left: 70%; /* 가운데 정렬 */
  }

  .timeline-title-right {
    text-align: center; /* 제목 가운데 정렬 */
    font-size: 12px;
    margin-top: 2px; /* 제목과 타임라인 간격 조정 */
    position: absolute;
    top: -10%; /* 타임라인 위에 위치 */
    left: -60%; /* 가운데 정렬 */
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
  padding-left:30px;
  display: flex;
  align-items: flex-start; /* 상단 정렬 */
}

.left-timeline >>> .p-timeline-event-content {
  display: none;
}

.right-timeline >>> .p-timeline-event-opposite {
  display:none;
}

.right-timeline >>> .p-timeline-event-content {
  padding: 25px;
}


  .timeline-space {
    flex: 1;
    align-items: center;
    width:100%;
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

  </style>
