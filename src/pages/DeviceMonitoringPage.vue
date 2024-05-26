<template>
  <TheHeader />
  <main class="content">
    <div class="row mt-2 mb-3">
      <div class="col-12">
        <Card class="diagram-card">
          <template #content>
            <DeviceDiagram />
          </template>
        </Card>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <Card class="device-card">
          <template #title>Connected Devices</template>
          <template #content>
            <DeviceTable :values="deviceData"></DeviceTable>
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
import { computed } from "vue";
import { useWebSocketStore } from "@/stores";

const websocketStore = useWebSocketStore();
const deviceData = computed(() => {
  return websocketStore.statMessage.data.map((item) => ({
    ip: item.device.ip,
    mac: item.device.mac,
    hostname: item.device.hostname,
    send_pkt: item.stat.send_pkt,
    recv_pkt: item.stat.recv_pkt,
    send_data: item.stat.send_data,
    recv_data: item.stat.recv_data
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
