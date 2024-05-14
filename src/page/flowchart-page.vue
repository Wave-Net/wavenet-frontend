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
  margin-bottom: 5px;
  position: relative; /* 새로 추가된 속성 */
  z-index: 1; /* 추가 */
}

.horizontal-line::before {
  content: "";
  position: absolute;
  right: -10px; /* 화살표 머리 위치 조정 */
  top: -6px; /* 화살표 머리 위치 조정 */
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid black; /* 화살표 머리 색상 */
  z-index: 2; /* 추가 */
}

.horizontal-line::after {
  content: "";
  position: absolute;
  left: -10px; /* 화살표 머리 위치 조정 */
  top: -6px; /* 화살표 머리 위치 조정 */
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 10px solid black; /* 화살표 머리 색상 */
  z-index: 2; /* 추가 */
}
  
  .horizontal-line-text {
    font-size: 12px; /* 텍스트의 사이즈 설정 */
    margin: 0; /* 디폴트 마진 제거 */
    margin-bottom: 48px; /* 텍스트 아래쪽 여백 설정 */
    text-align: center;
  }




  </style>
