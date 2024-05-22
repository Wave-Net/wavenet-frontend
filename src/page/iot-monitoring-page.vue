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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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

const data = ref({
  key: "0",
  data: { image: "https://i.ibb.co/VQGjYtS/laptop.png" },
  children: []
});

function generateChildNodes(count) {
  return Array.from({ length: count }, (v, i) => ({
    key: `0-${i + 1}`,
    data: {
      title: `${i + 1}`,
      is_transmitting: iot.value[i] ? iot.value[i].is_transmitting : false,
    },
  }));
}

onMounted(() => {
  data.value.children = generateChildNodes(iot.value.length);
});

watchEffect(() => {
  data.value.children = generateChildNodes(iot.value.length);
});
</script>

<style scoped>
.menubar img {
  display: block;
  margin: 0 auto;
}

.container {
  margin: 0 auto;
}

.chart {
  overflow-x: auto;
}

.chart >>> .p-organizationchart-table > tbody > tr > td {
  padding: 0 0.2rem;
}

.chart >>> .p-organizationchart-node-content {
  padding: 0.5rem;
  flex: 0 0 auto;
}

.custom-datatable .p-datatable-tbody > tr > td {
  border-bottom: 1px solid #ccc;
  width: 100%;
}

.node-text {
  font-size: 1rem;
}

.node-image {
  max-width: 30px;
  max-height: 30px;
}

.spacer {
  height: 20px;
}
</style>
