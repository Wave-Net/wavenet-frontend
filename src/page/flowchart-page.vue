<template>
    <div class="timeline-container">
      <div class="left-timeline">
  <Timeline class="left-timeline" :value="leftEvents">
    <template #opposite="slotProps">
      <div class="p-text-secondary">{{ slotProps.item.date }}</div>
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
  <Timeline class="right-timeline" :value="rightEvents"></Timeline>
</div>
    </div>
  </template>
  
  <script>
  import Timeline from 'primevue/timeline';
  import { ref } from 'vue';
  
  export default {
    components: {
      Timeline
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
  
      return { leftEvents, rightEvents };
    }
  };
  </script>
  
  <style scoped>
  .timeline-container {
    display: flex;
    justify-content: space-between;
  }

  .line-container {
  position: relative; /* 추가된 부분 */
}

  .left-timeline >>> .p-timeline-event-opposite {
  padding-right: 20px;
  padding-left:20px;
}

.left-timeline >>> .p-timeline-event-content {
  display: none;
}

.right-timeline >>> .p-timeline-event-opposite {
  display:none;
}

  .timeline-space {
    flex: 1;
    align-items: center;
    width:100%;
  }

  .horizontal-line {
  width: 100%;
  border-top: 1px solid black;
  border-bottom: none;
  margin-bottom: 5px;
  position: relative;
  z-index: 1; /* 수정된 부분 */
}
  
  .horizontal-line-text {
    font-size: 12px; /* 텍스트의 사이즈 설정 */
    margin: 0; /* 디폴트 마진 제거 */
    margin-bottom: 48px; /* 텍스트 아래쪽 여백 설정 */
    text-align: center;
  }

.right-arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid black;
  position: absolute;
  left: calc(100% - 10px);
  top: -9.6px;
}


.left-arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid black;
  position: absolute;
  left: calc(10 - 10px);
  top: -9.6px;
  transform: scaleX(-1);
}

  </style>
