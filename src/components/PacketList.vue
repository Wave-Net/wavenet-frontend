<template>
    <div class="card">
        <DataTable 
        id="mytable"
        :value="products" 
        :size="small" 
        showGridlines 
        scrollable scrollHeight="100vh"  
        tableStyle="min-width: 50rem"
        contextMenu v-model:contextMenuSelection="selectedProduct"
        >
            <!-- size : 칸 간격
            showGridlines : 그리드 속성 
            scrollable scrollHeight 스크롤바/스크롤바 생성 위
        -->
        
            <Column field="number" header="No."></Column>
            <Column field="time" header="Time"></Column>
            <Column field="source" header="Source IP"></Column>
            <Column field="destination" header="Destination IP"></Column>
            <Column field="proto" header="Protocol"></Column>
            <Column field="len" header="Len"></Column>
            <Column field="info" header="Info"></Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { packet } from '@/./pktlist/packet';

export default {
    components:{
        DataTable,
        Column,

    },
    data() {
        return {
            products: null
        };
    },
    mounted() {
        packet.getProductsMini().then((data) => (this.products = data));
    }
};

</script>
