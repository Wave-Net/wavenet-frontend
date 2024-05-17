<template>
  <div class="container">
    <div>
      <Menubar :model="menuItems" class="menubar">
        <template #start>
          <img
            alt="logo"
            src="@/assets/wavenetLogo.png"
            height="40"
            class="mr-2"
          />
        </template>
      </Menubar>
    </div>
    <div class="spacer"></div>

    <div class="chart-container">
      <div>
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
                :style="{
                  color: slotProps.node.data.is_transmitting ? 'green' : 'red',
                }"
              >
                <div class="node-text">{{ slotProps.node.data.title }}</div>
                <div>{{ slotProps.node.data.email }}</div>
              </div>
            </div>
          </template>
        </OrganizationChart>
      </div>
    </div>

    <div>
      <DataTable :value="iot" stripedRows class="custom-datatable">
        <Column field="index" header="#" sortable style="width: 8%"></Column>
        <Column field="mac" header="MAC" sortable style="width: 8%"></Column>
        <Column field="ip" header="IP" sortable style="width: 8%"></Column>
        <Column
          field="vendor"
          header="Vendor"
          sortable
          style="width: 8%"
        ></Column>
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
          style="width: 8%"
        ></Column>
        <Column
          field="receive_byte"
          header="수신 바이트"
          sortable
          style="width: 8%"
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
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import OrganizationChart from "primevue/organizationchart";
import Menubar from "primevue/menubar";

const iot = ref([
  {
    index: 1,
    mac: "00:11:22:33:44:55",
    ip: "192.168.1.1",
    vendor: "Vendor A",
    hostname: "Host 1",
    send_byte: 100,
    receive_byte: 200,
    send_packet: 50,
    receive_packet: 75,
    is_transmitting: true,
  },
  {
    index: 2,
    mac: "AA:BB:CC:DD:EE:FF",
    ip: "192.168.1.2",
    vendor: "Vendor B",
    hostname: "Host 2",
    send_byte: 150,
    receive_byte: 250,
    send_packet: 75,
    receive_packet: 100,
    is_transmitting: false,
  },
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

const data = {
  key: "0",
  data: {
    image: "https://i.ibb.co/VQGjYtS/laptop.png",
  },
  children: generateChildNodes(iot.value.length),
};

function fetchNewData() {
  // 데이터를 가져오는 로직을 이곳에 구현합니다.
  // 현재는 빈 배열을 반환합니다.
  const newData = [];
  iot.value = [...iot.value, ...newData];
}

function generateChildNodes(count) {
  const childNodes = [];
  for (let i = 0; i < count; i++) {
    childNodes.push({
      key: `0-${i + 1}`,
      data: {
        title: `${i + 1}`,
        is_transmitting: iot.value[i] ? iot.value[i].is_transmitting : false,
      },
    });
  }
  return childNodes;
}

// 컴포넌트가 마운트될 때 초기 데이터를 가져오고 조직도의 자식 노드를 동적으로 생성합니다.
onMounted(() => {
  fetchNewData();
  data.children = generateChildNodes(iot.value.length);
});

// iot 데이터가 변경될 때마다 조직도의 자식 노드를 업데이트합니다.
watchEffect(() => {
  data.children = generateChildNodes(iot.value.length);
});
</script>

<style scoped>
.menubar img {
  display: block;
  margin: 0 auto;
}

.container {
  width: 100%;
  max-width: 1200px; /* 페이지의 최대 너비를 제한합니다. */
  margin: 0 auto; /* 페이지를 가운데 정렬합니다. */
}

.chart-container {
  display: flex;
  justify-content: center; /* 상위 노드를 가운데 정렬합니다. */
}

.chart {
  display: inline-block;
  text-align: left; /* 하위 노드를 좌측 정렬합니다. */
  max-width: 100%; /* 최대 너비를 설정합니다. */
  overflow-x: auto; /* 필요한 경우에만 가로 스크롤을 활성화합니다. */
  white-space: nowrap; /* 내용이 한 줄로 유지되도록 설정합니다. */
}

.custom-datatable .p-datatable-tbody > tr > td {
  border-bottom: 1px solid #ccc;
  width: 100%;
}

.chart .p-organizationchart-node-content {
  padding: 0.5rem; /* 노드 내부 여백을 줄입니다. */
}

.node-text {
  font-size: 1rem; /* 노드 텍스트의 폰트 크기를 조절합니다. */
}

.node-image {
  max-width: 30px;
  max-height: 30px;
}

.spacer {
  height: 20px; /* 원하는 여백의 높이로 조정하세요 */
}
</style>
