<template>
  <div class="card">
    <ContextMenu ref="cm" :model="menuModel" @hide="selectedProduct = null" />
    <DataTable :value="messages" id="mytable" size="small" showGridlines scrollable scrollHeight="95vh"
      tableStyle="min-width: 50rem" contextMenu v-model:contextMenuSelection="selectedProduct"
      @rowContextmenu="onRowContextMenu">
      <Column field="number" header="No."></Column>
      <Column field="time" header="Time"></Column>
      <Column field="source" header="Source IP"></Column>
      <Column field="destination" header="Destination IP"></Column>
      <Column field="protocol" header="Protocol"></Column>
      <Column field="length" header="Len"></Column>
      <Column field="info" header="Info"></Column>
    </DataTable>
    <Dialog v-model:visible="display" :modal="true" header="패킷 다이어그램" :style="{ width: '50vw' }">
      <!-- 패킷 다이어그램 내용을 여기에 추가하세요 -->
      안녕하세요.<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>메롱
    </Dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useWebSocketStore } from '@/store/websocketStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ContextMenu from 'primevue/contextmenu';
import Dialog from 'primevue/dialog';

const websocketStore = useWebSocketStore();
const cm = ref();
const selectedProduct = ref();
const menuModel = ref([
  { label: '패킷 다이어그램', icon: 'pi pi-objects-column', command: () => viewProduct(selectedProduct) },
  // {label: '플로우차트', icon: 'pi pi-sliders-h', command: () => deleteProduct(selectedProduct)}
]);

// Dialog 표시 상태
const display = ref(false);

// 웹소켓 연결
onMounted(() => {
  websocketStore.connect('ws://localhost:8765');
});

// 컴포넌트 언마운트 시 웹소켓 연결 종료
onUnmounted(() => {
  websocketStore.disconnect();
});

// 메시지 목록 가져오기
const messages = computed(() => websocketStore.messages);

const onRowContextMenu = (event) => {
  cm.value.show(event.originalEvent);
};

const viewProduct = () => {
  // 여기에 행을 다이어그램화 하는 로직을 추가하세요.
  display.value = true;
};

// const deleteProduct = (product) => {
//   // 여기에 행을 플로우차트화 하는 로직을 추가하세요.
// };
</script>
