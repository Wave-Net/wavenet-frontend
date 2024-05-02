<template>
    <div class="card">
        <DataTable 
        id="mytable"
        :value="products" 
        size="small" 
        showGridlines 
        scrollable scrollHeight="100vh"  
        tableStyle="min-width: 50rem"
        contextMenu v-model:contextMenuSelection="selectedProduct"
        >
            <Column field="number" header="No."></Column>
            <Column field="time" header="Time"></Column>
            <Column field="source" header="Source IP"></Column>
            <Column field="destination" header="Destination IP"></Column>
            <Column field="protocol" header="Protocol"></Column>
            <Column field="length" header="Len"></Column>
            <Column field="info" header="Info"></Column> 
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    components:{
        DataTable,
        Column,

    },
    data() {
        return {
            products: [],
        };
    },
    mounted() {
        iotpacket.getProductsMini().then((data) => {this.products = data});
    },
    methods: {
    }
};

export const iotpacket = {
    getProductsData() {
        return [];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData());
    }
}

const socket1 = new WebSocket(`ws://127.0.0.1:8088/front`) //사용예제

socket1.onmessage = function(event) {
    const receivedData = JSON.parse(event.data);
    console.log('받은 데이터:', receivedData);

    // 원하는 방식으로 데이터를 처리하여 products 배열에 추가
    this.products.push(receivedData);
};
</script>
