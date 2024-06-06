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
import { watch, ref, computed, onMounted, onUnmounted } from "vue";
import { useMonitorStore } from "@/stores";

const monitorStore = useMonitorStore();
const deviceData = ref([]);
const referenceData = ref([]);

onMounted(() => {
  monitorStore.connect();
});

onUnmounted(() => {
  monitorStore.disconnect();
});

const isActive = (newItem, oldItem) => {
  if (!oldItem) return true;

  const { send_pkt, recv_pkt, send_data, recv_data } = oldItem.stat;
  const {
    send_pkt: newSendPkt,
    recv_pkt: newRecvPkt,
    send_data: newSendData,
    recv_data: newRecvData,
  } = newItem.stat;

  return (
    send_pkt !== newSendPkt ||
    recv_pkt !== newRecvPkt ||
    send_data !== newSendData ||
    recv_data !== newRecvData
  );
};

const updateDeviceData = (newData) => {
  return newData.map((newItem, index) => {
    const referenceItem = referenceData.value.find(
      (item) => item.device.ip === newItem.device.ip
    );

    let is_active = false;
    if (!referenceItem) {
      referenceData.value.push(newItem);
    } else {
      is_active = isActive(referenceItem, newItem);

      if (is_active) {
        referenceData.value = referenceData.value.map((item) =>
          item.device.ip === newItem.device.ip ? newItem : item
        );
      }
    }

    return {
      ...newItem,
      is_active,
      index: index + 1,
    };
  });
};

watch(
  () => monitorStore.monitorMessage.data,
  (newData, oldData) => {
    deviceData.value = updateDeviceData(newData, oldData);
  }
);

const processedDeviceData = computed(() => {
  return deviceData.value.map((item) => ({
    ip: item.device.ip,
    mac: item.device.mac,
    vendor: item.device.vendor,
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
