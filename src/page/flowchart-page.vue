<template>
    <div class="timeline-container">
      <div class="left-timeline">
        <Timeline :value="leftEvents">
          <template #opposite="slotProps">
            <small class="p-text-secondary">{{ slotProps.item.date }}</small>
          </template>
          <template #content="slotProps">
            {{ slotProps.item.status }}
            
          </template>
        </Timeline>
      </div>
      <div class="right-timeline">
        <Timeline :value="rightEvents">
          <template #content="slotProps">
            {{ slotProps.item.status }}
          </template>
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
        {  status: 'Some status 2 (Right)' },
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
  position: relative;
}

.left-timeline,
.right-timeline {
  flex: 1;
  position: relative; /* 추가 */
}

/* 수평선 추가 */
.left-timeline::after,
.right-timeline::before {
  content: "";
  position: absolute;
  top: 50%;
  width: calc(50% - 30px); /* 타임라인 간격 조절 */
  height: 2px;
  background-color: #dee2e6;
}

.left-timeline::after {
  right: 0;
}

.right-timeline::before {
  left: 0;
}
  </style>
  