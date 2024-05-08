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
  import 'primevue/resources/themes/saga-blue/theme.css'; // 테마 스타일링
  import 'primevue/resources/primevue.min.css'; // PrimeVue CSS 파일
  import 'primeicons/primeicons.css'; // PrimeIcons CSS 파일
  
  export default {
    name: 'MyDataTable',
    components: {
      DataTable,
      Column
    },
    data() {
      return {
        products: [
          { name: '패킷 입력/초', price: 100, category: 'Category A' },
          { name: '패킷 출력/초', price: 200, category: 'Category B' },
          { name: '데이터 수신/초', price: 300, category: 'Category A' },
          { name: '데이터 전송/초', price: 300, category: 'Category A' }
        ]
      };
    }
  };
  </script>