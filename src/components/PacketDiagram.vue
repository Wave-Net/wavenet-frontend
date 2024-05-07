<template>
  <!-- selectedRowData를 사용하여 대화창 내용을 표시합니다. -->
  <!-- <div v-if="selectedRowData">
    <p> 안녕하세용가리 </p>
    Len: {{ selectedRowData.length }} <br>
    qos: {{ selectedRowData.qos }} <br>
    value: {{ selectedRowData.value }} <br>
  </div> -->

  <!-- fixed Header -->
  <!-- MQTT패킷이라면 -->
  <div v-if="pkt.name == 'MQTT'">
    <!-- 
      <p class="key-txt"><br><span class="val-txt"></span></p>
    -->
    <p class="key-txt">Type<br><span class="val-txt">{{ pkt.mqtt_type }}</span></p>
    <p class="key-txt">Dup Flag<br><span class="val-txt">{{ pkt.mqtt_dup }}</span></p>
    <p class="key-txt">QoS<br><span class="val-txt">{{ pkt.mqtt_qos }}</span></p>
    <p class="key-txt">Retain<br><span class="val-txt">{{ pkt.mqtt_retain }}</span></p>
  </div>

</template>

<script>
export default {
  props: {
    pkt: Object
  },
  mounted() {
    console.log(this.pkt);
  },
  // 나머지 코드
}
</script>

<style>
.key-txt {
  font-size: 10px;
  text-align: center;
}

.val-txt {
  font-size: 16px;
}
</style>