<template>
  <TheHeader />
  <main class="content">
    <div class="row mt-2 mb-3">
      <div class="col-12">
        <Card class="diagram-card">
          <template #content>
            <DeviceDiagram :deviceData="processedDeviceData" />
          </template>
        </Card>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <Card class="device-card">
          <template #title>Connected Devices</template>
          <template #content>
            <DeviceTable :values="processedDeviceData" />
          </template>
        </Card>
      </div>
    </div>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { TheHeader, TheFooter, DeviceTable, DeviceDiagram } from "@/components";
import Card from "primevue/card";
// import { deviceData } from "@/data/devices";
import { watch, ref, computed } from "vue";
import { useWebSocketStore, websocketTypes } from "@/stores";

const websocketStore = useWebSocketStore();
const deviceData = ref([]);

const isActive = (newItem, oldItem) => {
  return oldItem ? (
    oldItem.stat.send_pkt !== newItem.stat.send_pkt ||
    oldItem.stat.recv_pkt !== newItem.stat.recv_pkt ||
    oldItem.stat.send_data !== newItem.stat.send_data ||
    oldItem.stat.recv_data !== newItem.stat.recv_data
  ) : true;
};

const isAllStatsZero = (stat: websocketTypes.StatInfo) => {
  return stat.send_pkt === 0 &&
         stat.recv_pkt === 0 &&
         stat.send_data === 0 &&
         stat.recv_data === 0;
};

const updateDeviceData = (newData, oldData) => {
  return newData.map((newItem, index) => {
    const oldItem = oldData?.find(item => item.device.ip === newItem.device.ip);
    newItem.is_active = isActive(newItem, oldItem) && !isAllStatsZero(newItem.stat);
    newItem.index = index + 1;
    return newItem;
  });
};

watch(
  () => websocketStore.statMessage.data,
  (newData, oldData) => {
    deviceData.value = updateDeviceData(newData, oldData);
  }
);

const processedDeviceData = computed(() => {
  return deviceData.value.map((item) => ({
    ip: item.device.ip,
    mac: item.device.mac,
    hostname: item.device.hostname,
    send_pkt: item.stat.send_pkt,
    recv_pkt: item.stat.recv_pkt,
    send_data: item.stat.send_data,
    recv_data: item.stat.recv_data,
    index: item.index,
    is_active: item.is_active,
  }));
});
</script>

<style scoped>
.device-card {
  width: 1160px;
  height: 458px;
}

.diagram-card {
  width: 1160px;
  height: 140px;
}
</style>
