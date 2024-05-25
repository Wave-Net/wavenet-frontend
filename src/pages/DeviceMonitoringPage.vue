<template>
  <TheHeader />
  <main class="content">
    <div class="row">
      <div class="col-9">
        <Card>
          <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </template>
        </Card>
      </div>
    </div>
    <div class="row">
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
import { TheHeader, TheFooter, DeviceTable } from "@/components";
import { deviceData } from "@/data/devices";
import Card from "primevue/card";

</script>

<style scoped>
.device-card {
  width: 1160px;
}
</style>
