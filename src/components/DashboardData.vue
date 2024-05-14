<template>
  <div>
    <div class="title-row">
      패킷 송신:
      <span>{{ table_pkt_send }}</span>
    </div>
    <div class="title-row">
      패킷 수신:
      <span>{{ table_pkt_recv }}</span>
    </div>
    <div class="title-row">
      데이터 송신:
      <span>{{ table_data_send }}</span>
    </div>
    <div class="title-row">
      데이터 수신:
      <span>{{ table_data_recv }}</span>
    </div>
  </div>
</template>

<script>
import { useWebSocketStore } from "../store/websocketStore";
import { ref, watch } from "vue";

export default {
  setup() {
    const websocketStore = useWebSocketStore();

    // 각각의 패킷 및 데이터 송/수신 정보를 저장하는 ref를 생성합니다.
    const table_pkt_recv = ref(0);
    const table_pkt_send = ref(0);
    const table_data_recv = ref(0);
    const table_data_send = ref(0);

    // 웹소켓 스토어의 statMessage가 변경될 때마다 실행되는 watch 함수를 설정합니다.
    watch(
      () => websocketStore.statMessage,
      (newValue) => {
        // 새로운 값이 있고, 그 값에 total_statistics가 있는 경우
        if (newValue && newValue.total_statistics) {
          table_pkt_recv.value = newValue.total_statistics.send_pkt;
          table_pkt_send.value = newValue.total_statistics.recv_pkt;
          table_data_recv.value = newValue.total_statistics.send_data;
          table_data_send.value = newValue.total_statistics.recv_data;
        }
      }
    );

    // 각각의 ref를 반환하여 템플릿에서 사용할 수 있게 합니다.
    return {
      table_pkt_recv,
      table_pkt_send,
      table_data_recv,
      table_data_send,
    };
  },
};
</script>

<style>
.title-row {
  background-color: white;
  margin-top: 5px;
  text-align: center;
}
</style>
