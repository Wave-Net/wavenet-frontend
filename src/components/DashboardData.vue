<template>
  <div>
    <DataTable :value="products">
      <Column field="name" header="Name"></Column>
      <Column field="value" header="Value"></Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'; // setup 내에서 import
import { useWebSocketStore } from '@/store/websocketStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primevue/resources/themes/saga-blue/theme.css'; // 테마 스타일링
import 'primevue/resources/primevue.min.css'; // PrimeVue CSS 파일
import 'primeicons/primeicons.css'; // PrimeIcons CSS 파일

export default {
  name: 'MyDataTable',
  components: {
    DataTable,
    Column
  },
  setup() {
    const products = ref([
      { name: '패킷 입력 횟수', value: 0 },
      { name: '패킷 출력 횟수', value: 0 },
      { name: '데이터 수신 크기', value: 0 },
      { name: '데이터 전송 크기', value: 0 }
    ]);

    // useWebSocketStore는 사용하는 파일에 맞게 import 필요
    const { totalStatics } = useWebSocketStore();

    // totalStatics 값이 변경될 때마다 테이블 데이터 업데이트
    watchEffect(() => {
      products.value[0].value = totalStatics.recv_pkt;
      products.value[1].value = totalStatics.send_pkt;
      products.value[2].value = totalStatics.recv_data;
      products.value[3].value = totalStatics.send_data;
    });

    return { products };
  }
};
</script>
