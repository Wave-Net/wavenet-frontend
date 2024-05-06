<template>
  <div class="card">
    <DataTable
      :value="messages"
      id="mytable"
      size="small"
      showGridlines
      scrollable
      scrollHeight="100vh"
      tableStyle="min-width: 50rem"
      contextMenu
      v-model:contextMenuSelection="selectedProduct"
    >
      <Column field="rowIndex" header="No.">
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column field="seconds_since_beginning" header="Time"></Column>
      <Column field="source_ip" header="Source IP"></Column>
      <Column field="destination_ip" header="Destination IP"></Column>
      <Column field="protocol" header="Protocol"></Column>
      <Column field="length" header="Len"></Column>
      <Column field="topic" header="Info"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useWebSocketStore } from "@/store/websocketStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const websocketStore = useWebSocketStore();

// 웹소켓 연결
onMounted(() => {
  websocketStore.connect("ws://localhost:8765");
});

// 컴포넌트 언마운트 시 웹소켓 연결 종료
onUnmounted(() => {
  websocketStore.disconnect();
});

// 메시지 목록 가져오기
const messages = computed(() => websocketStore.messages);
</script>
