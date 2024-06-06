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
          :to="`/capture-page?device_ip=${slotProps.data.ip}`"
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
  { field: "index", header: "#", style: { width: "40.29px" } },
  { field: "mac", header: "MAC", style: { width: "160px" } },
  { field: "ip", header: "IP", style: { width: "125px" } },
  { field: "vendor", header: "Vendor", style: { width: "145px" } },
  { field: "hostname", header: "Hostname", style: { width: "125px" } },
  { field: "send_data", header: "Send Byte", style: { width: "161.14px" } },
  { field: "recv_data", header: "Recv Byte", style: { width: "161.14px" } },
  { field: "send_pkt", header: "Send Packet", style: { width: "120.86px" } },
  { field: "recv_pkt", header: "Recv Packet", style: { width: "120.86px" } },
  {
    field: "capture",
    header: "Capture",
    style: { width: "40.29px" },
    notSortable: true,
  },
];
</script>

<style scoped>
.p-component,
.p-component * {
  box-sizing: border-box;
  font-size: 12px;
}

.p-button {
  padding: 0.3rem 0.4rem;
}
</style>
