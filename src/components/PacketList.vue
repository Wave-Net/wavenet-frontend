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
import { useWebSocketStore } from '@/store/websocketStore';

export default {
    components: {
        DataTable,
        Column,
    },
    data() {
        return {
            products: [],
            selectedProduct: null,
            websocketStore: useWebSocketStore(),
        };
    },
    mounted() {
        this.websocketStore.connect();
        this.subscribeToWebSocketStore();
    },
    beforeUnmount() {
        this.websocketStore.disconnect();
    },
    methods: {
        subscribeToWebSocketStore() {
            this.websocketStore.$subscribe(() => {
                this.updateProducts();
            });
        },
        updateProducts() {
            this.products = this.websocketStore.messages.map((message, index) => ({
                number: index + 1,
                time: '', // 시간을 어떻게 얻을 지에 따라 구현이 필요
                source: '', // 출발지 IP를 어떻게 얻을 지에 따라 구현이 필요
                destination: '', // 목적지 IP를 어떻게 얻을 지에 따라 구현이 필요
                protocol: 'MQTT', // 프로토콜 정보가 있을 경우 추가
                length: message.length,
                info: message.data,
            }));
        },
    },
};
</script>