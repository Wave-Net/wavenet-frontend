<template>
  <div>
    <DataTable :value="products">
      <Column field="name"></Column>
      <Column field="price"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { defineComponent, ref, watch } from 'vue';
import { useWebSocketStore } from '../store/websocketStore';

export default defineComponent({
  name: 'MyDataTable',
  components: {
    DataTable,
    Column
  },
  setup() {
    const store = useWebSocketStore();
    const products = ref([
      { name: '패킷 출력/초', price: 0, category: 'Category A' },
      { name: '패킷 입력/초', price: 0, category: 'Category B' },
      { name: '데이터 송신/초', price: 0, category: 'Category A' },
      { name: '데이터 수신/초', price: 0, category: 'Category A' }
    ]);

    // WebSocket 리스너 설정
    watch(() => store.staticsDelta, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        // 새로운 데이터가 도착하면 products 배열을 업데이트
        Object.keys(newValue).forEach((key, index) => {
          products.value[index].price = newValue[key];
        });
      }
    });

    return {
      products
    };
  }
});

</script>
