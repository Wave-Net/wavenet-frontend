<template>
    <div class="timeline-container">
      <div class="left-timeline">
        <Timeline :value="leftEvents">
          <template #opposite="slotProps">
            <small class="p-text-secondary">{{ slotProps.item.date }}</small>
          </template>
        </Timeline>
      </div>
  
      <!-- 추가된 가로선과 텍스트 -->
      <div class="timeline-space">
        <div v-for="index in leftEvents.length" :key="index">
          <hr class="horizontal-line">
          <p class="horizontal-line-text">Your text here</p>
        </div>
      </div>
      <!-- 추가된 가로선과 텍스트 -->
  
      <div class="right-timeline">
        <Timeline :value="rightEvents">
        </Timeline>
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
        { date: '2024-05-13', status: 'Some status 1 (Left)' },
        { date: '2024-05-14', status: 'Some status 2 (Left)' },
        { date: '2024-05-15', status: 'Some status 3 (Left)' },
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
  
  .left-timeline,
  .right-timeline {
    flex: 1;
  }
  
  .timeline-space {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .horizontal-line {
    width: 100%;
    border-top: 1px solid black; /* 가로선의 스타일 설정 */
    margin-bottom: 5px; /* 가로선과 텍스트 사이의 간격 조절 */
  }
  
  .horizontal-line-text {
    font-size: 12px; /* 텍스트의 사이즈 설정 */
    margin: 0; /* 디폴트 마진 제거 */
    margin-bottom: 39px; /* 텍스트 아래쪽 여백 설정 */
  }
  </style>
