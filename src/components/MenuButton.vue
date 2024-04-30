<template>
    <div>
        <ToggleButton 
        v-model="capturechecked" 
        onLabel="중단" 
        offLabel="시작"
        onIcon="pi pi-stop-circle" 
        offIcon="pi pi-play-circle"
        class="startButton"
        
        />

        <SplitButton
        label="데이터내보내기"
        :model="items"
        :disabled="capturechecked"
        class="dataPrint"
        >
            <i class="pi pi-download"> 데이터 내보내기</i> <!-- pi-download 아이콘 추가 -->
        </SplitButton>
    </div>
</template>

<script>
import ToggleButton from 'primevue/togglebutton';
import SplitButton from 'primevue/splitbutton';
import 'primeicons/primeicons.css'



export default {
    components:{
        ToggleButton,
        SplitButton,
    },
    data () {
        return {
            capturechecked: false,
            items:[
                {
                    label: 'PCAP',
                },
                {
                    label: 'JSON',
                },
                {
                    label: 'CSV'
                },
            ],
        };
    }
};
</script>

<style>
.startButton{
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
}
.dataPrint{
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
}
</style>