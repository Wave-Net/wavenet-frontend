<template>
  <DataTable
    :value="values"
    removableSort
    scrollable
    scrollHeight="420px"
  >
    <Column
      v-for="col of columns"
      sortable
      :key="col.field"
      :field="col.field"
      :header="col.header"
			:style="col.style"
    ></Column>
  </DataTable>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

defineProps({
  values: Array,
});

const columns = [
  { field: "index", header: "#", style: { width: "10rem" } },
  { field: "mac", header: "MAC", style: { width: "70rem" } },
  { field: "ip", header: "IP", style: { width: "70rem" } },
  { field: "hostname", header: "Hostname", style: { width: "70rem" } },
  { field: "send_byte", header: "Send Byte", style: { width: "70rem" } },
  { field: "receive_byte", header: "Receive Byte", style: { width: "70rem" } },
  { field: "send_packet", header: "Send Packet", style: { width: "70rem" } },
  { field: "receive_packet", header: "Receive Packet", style: { width: "70rem" } },
];
</script>

<style scoped></style>
