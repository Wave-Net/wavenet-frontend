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
            this.websocketStore.$subscribe((mutation) => {
                if (mutation.type === 'websocket/addMessage') {
                    const newMessage = mutation.payload;
                    this.products.push({
                        number: this.products.length + 1,
                        time: '',
                        source: '',
                        destination: '',
                        protocol: 'MQTT',
                        length: newMessage.length,
                        info: newMessage.data,
                    });
                }
            });
        },
    },
};
</script>