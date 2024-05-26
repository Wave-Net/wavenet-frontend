<template>
  <DataTable :value="values" removableSort scrollable scrollHeight="380px">
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :style="col.style"
      :sortable="!col.notSortable"
    >
      <template v-if="col.field === 'capture'" #body="slotProps">
        <router-link
          :to="`/capture-page?deviceIp=${slotProps.data.ip}`"
          target="_blank"
          rel="noopener"
        >
          <Button label="Start" />
        </router-link>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

defineProps({
  values: Array,
});

const columns = [
  { field: "index", header: "#", style: { width: "1rem" } },
  { field: "mac", header: "MAC", style: { width: "20rem" } },
  { field: "ip", header: "IP", style: { width: "10rem" } },
  { field: "hostname", header: "Hostname", style: { width: "10rem" } },
  { field: "send_data", header: "Send Byte", style: { width: "30rem" } },
  { field: "recv_data", header: "Receive Byte", style: { width: "30rem" } },
  { field: "send_pkt", header: "Send Packet", style: { width: "20rem" } },
  { field: "recv_pkt", header: "Receive Packet", style: { width: "20rem" } },
  { field: "capture", header: "Capture", style: { width: "1rem" }, notSortable: true },
];
</script>

<style scoped></style>
