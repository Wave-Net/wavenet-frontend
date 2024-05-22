<template>
  <div class="container">
<Header_template></Header_template>
    <div class="chart-container">
        <OrganizationChart :value="data" class="chart">
          <template #default="slotProps">
            <div>
              <div v-if="slotProps.node.data.image" class="node-header">
                <img
                  :src="slotProps.node.data.image"
                  :alt="slotProps.node.data.title"
                  class="node-image"
                />
              </div>
              <div v-else class="node-header">{{ slotProps.node.label }}</div>
              <div
                class="node-content"
                :style="{  color: data.is_transmitting ? 'green' : 'red'
                  
                }"
              >
                <div class="node-text">{{ slotProps.node.data.title }}</div>
                <div>{{ slotProps.node.data.email }}</div>
              </div>
            </div>
          </template>
        </OrganizationChart>
    </div>

    <div class="data-container">
      <div class="data-container-title">Connencted device</div>
      <DataTable :value="iot" class="custom-datatable" :rows="10" paginator>
        <Column field="index" header="#" sortable style="width: 1%"></Column>
        <Column field="mac" header="MAC" sortable style="width: 8%"></Column>
        <Column field="ip" header="IP" sortable style="width: 8%"></Column>
        <Column
          field="hostname"
          header="Hostname"
          sortable
          style="width: 8%"
        ></Column>
        <Column
          field="send_byte"
          header="송신 바이트"
          sortable
          style="width: 9%"
        ></Column>
        <Column
          field="receive_byte"
          header="수신 바이트"
          sortable
          style="width: 9%"
        ></Column>
        <Column
          field="send_packet"
          header="송신 패킷"
          sortable
          style="width: 8%"
        ></Column>
        <Column
          field="receive_packet"
          header="수신 패킷"
          sortable
          style="width: 8%"
        ></Column>
        <Column header="Capture" style="text-align: center; width: 1%">
          <template #body="slotProps">
            <Button label="start" severity="info" class="custom-button" @click="viewItem(slotProps.data.index-1)"></Button>
  </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useWebSocketStore } from '@/store/websocketStore';
import Header_template from "@/components/Header_template.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import OrganizationChart from "primevue/organizationchart";
import  Button  from "primevue/button";

const websocketStore = useWebSocketStore();

const viewItem = (index) => {
  const rowData = iot.value[index];
   const deviceIp = rowData.ip;
   console.log(deviceIp);
   websocketStore.startCapture(deviceIp);
};

const iot = ref([]);

const data = ref({
  key: "0",
  data: { image: "https://i.ibb.co/VQGjYtS/laptop.png" },
  children: [],
  is_transmitting: false,
});

let previousData = null; // 이전에 받은 데이터를 저장할 변수

function generateChildNodes(count) {
  return Array.from({ length: count }, (v, i) => ({
    key: `0-${i + 1}`,
    data: {
      title: `${i + 1}`,
    },
  }));
}

onMounted(() => {
  data.value.children = generateChildNodes(iot.value.length);
});

watch(
  () => websocketStore.statMessage,
  (newStatMessage) => {
    if (newStatMessage && newStatMessage.data) {
      iot.value = newStatMessage.data.map((item, index) => ({
        index: index + 1,
        mac: '알 수 없음', // 예시 데이터, 실제 데이터로 교체하세요
        ip: item.ip,
        hostname: '알 수 없음', // 예시 데이터, 실제 데이터로 교체하세요
        send_byte: item.stats.send_data,
        receive_byte: item.stats.recv_data,
        send_packet: item.stats.send_pkt,
        receive_packet: item.stats.recv_pkt,
      }));

      const hasChanged = JSON.stringify(newStatMessage.data) !== JSON.stringify(previousData);

      // 데이터가 변경되었다면 is_transmitting 값을 업데이트
      if (hasChanged) {
        // 패킷을 보냈거나 받은 경우를 확인합니다.
        const hasPacketSentOrReceived = newStatMessage.data.some(item => item.stats.send_pkt > 0 || item.stats.recv_pkt > 0);
        data.value.children = generateChildNodes(iot.value.length);
        data.value.is_transmitting = hasPacketSentOrReceived;
        
        // 이전 데이터를 현재 데이터로 업데이트
        previousData = newStatMessage.data;
      }else {
        // 데이터가 변경되지 않았다면 is_transmitting 값을 false로 설정
        data.value.is_transmitting = false;
      }
    }
  },
);

</script>

<style scoped>


.container {
  margin: 0 auto;
  background-color: #F8FAFC;
  min-height: 100vh;
}

.custom-button {
  padding: 0.1rem 0.5rem; /* 원하는 패딩 값으로 변경 */
  font-size: 0.7rem; /* 원하는 폰트 사이즈로 변경 */
}


.chart-container {
  width: 70%;
  background-color: white;
  border-radius: 12px;
  margin: 5px auto 5px auto;
  padding: 0px;
  display: flex; /* Flexbox를 사용하여 내부 요소를 정렬합니다. */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  border: 1px solid #e2e8f0;
}

.data-container {
  width: 70%;
  height: 60vh;
  background-color: white;
  border-radius: 12px;
  margin: 30px auto 0px auto; /* 좌우 마진을 자동으로 설정하여 수평 중앙 정렬 */
  padding:10px 20px 20px 20px;
  border: 1px solid #e2e8f0;
}
.data-container-title {
  margin: 5px 0px 15px 0px;
}
.chart {
  overflow-x: auto;
  width: 80%;
  margin: 10px auto 10px auto;
}


.custom-datatable >>> .p-icon {
  width: 0.7rem; /* 선택적으로 아이콘 너비 조절 */
  height: 0.7rem; /* 선택적으로 아이콘 높이 조절 */
}

.custom-datatable >>> .p-link {
  font-size: 0.7rem;
}


.chart >>> .p-organizationchart-table > tbody > tr > td {
  padding: 0 0.2rem;
}

.chart >>> .p-organizationchart-node-content {
  padding: 0.3rem;
  flex: 0 0 auto;
}


.custom-datatable {
  margin: 10px;
  font-size: 0.7rem;
}

.custom-datatable >>> .p-column-header-content {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  height: 100%; /* 필요한 경우, 높이를 100%로 설정하여 가운데 정렬 보장 */
  
}

.custom-datatable >>> .p-datatable-tbody > tr > td {
  border-bottom: 1px solid #e2e8f0;
  width: 100%;
  padding: 0.3rem 1rem;
  text-align: center;
}

.chart >>> .p-organizationchart-lines[data-pc-section="lines"][style*="visibility: hidden"] {
  display: none;
}

.node-text {
  font-size: 1rem;
}

.node-image {
  width: 20px;
  height: 20px;
}


</style>
