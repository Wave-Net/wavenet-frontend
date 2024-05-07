<template>
  <div v-if="selectedRowData">
    <!-- selectedRowData를 사용하여 대화창 내용을 표시합니다. -->
    <p> 안녕하세용가리 </p>
    Len: {{ selectedRowData.length }} <br>
    qos: {{ selectedRowData.qos }} <br>
    value: {{ selectedRowData.value }} <br>
  </div>
</template>

<script>
export default {
  props: {
    selectedRowData: Object
  },
  mounted() {
    console.log(this.selectedRowData);
  },
  // 나머지 코드
}
</script>