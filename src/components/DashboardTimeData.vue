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
          { name: 'Product 1', price: 100, category: 'Category A' },
          { name: 'Product 2', price: 200, category: 'Category B' },
          { name: 'Product 3', price: 300, category: 'Category A' }
        ]
      };
    }
  };
  </script>