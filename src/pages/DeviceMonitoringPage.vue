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
import { deviceData } from "@/data/devices";
import Card from "primevue/card";
</script>

<style scoped>
.device-card {
  width: 1160px;
}

.diagram-card {
  width: 1160px;
  height: 140px;
}
</style>
