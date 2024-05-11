<template>
  <div class="card">
    <ContextMenu ref="cm" :model="menuModel" @hide="selectedRow = null" />

    <DataTable
      :value="packetMessages"
      id="mytable"
      size="small"
      showGridlines
      scrollable
      scrollHeight="95vh"
      tableStyle="min-width: 50rem"
      contextMenu
      v-model:contextMenuSelection="selectedRowData"
      @rowContextmenu="onRowContextMenu"
      rowHover
      title="더 자세히 보려면 우클릭하세요."
    >
      <Column field="index" header="No."></Column>
      <Column field="seconds_since_beginning" header="Time"></Column>
      <Column field="source_ip" header="Source IP"></Column>
      <Column field="destination_ip" header="Destination IP"></Column>
      <Column field="name" header="Protocol"></Column>
      <Column field="length" header="Len"></Column>
      <Column field="type" header="Info"></Column>
      <!-- 수정해야할듯 -->
    </DataTable>
    <Dialog
      v-model:visible="display"
      :modal="true"
      header="패킷 다이어그램"
      :style="{ width: '50vw' }"
    >
      <PacketDiagram :pkt="selectedRowData" />
    </Dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useWebSocketStore } from "@/store/websocketStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ContextMenu from "primevue/contextmenu";
import Dialog from "primevue/dialog";
import PacketDiagram from "./PacketDiagram.vue";

const websocketStore = useWebSocketStore();
const cm = ref();
const selectedRow = ref();
const menuModel = ref([
  {
    label: "패킷 다이어그램",
    icon: "pi pi-objects-column",
    command: () => viewRow(selectedRow),
  },
  // {label: '플로우차트', icon: 'pi pi-sliders-h', command: () => deleteProduct(selectedRow)}
]);

// Dialog 표시 상태
const display = ref(false);

// 웹소켓 연결
onMounted(() => {
  websocketStore.connect("ws://localhost:8765");
});

// 컴포넌트 언마운트 시 웹소켓 연결 종료
onUnmounted(() => {
  websocketStore.disconnect();
});

// 메시지 목록 가져오기
const packetMessages = computed(() => websocketStore.packetMessages);

const selectedRowData = ref(null); // 선택한 행의 데이터를 저장할 ref를 생성합니다.

const onRowContextMenu = (event) => {
  cm.value.show(event.originalEvent);

  //몇번째 인덱스에 위치하는지 찾는 역할로, 각 메세지가 event.data와 동일한지 확인.
  selectedRow.value = packetMessages.value.findIndex(
    (message) => message === event.data
  );
  console.log(selectedRow.value);
  selectedRowData.value = packetMessages.value[selectedRow.value]; // 선택한 행의 데이터를 할당합니다.
};

const viewRow = (rowIndex) => {
  // 여기에 행을 다이어그램화 하는 로직을 추가하세요.

  if (rowIndex !== null) {
    display.value = true;
  } else {
    console.log("행을 선택해주세요.");
  }
};

// const deleteProduct = (product) => {
//   // 여기에 행을 플로우차트화 하는 로직을 추가하세요.
// };
</script>
