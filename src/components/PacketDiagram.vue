<template>
  <!-- selectedRowData를 사용하여 대화창 내용을 표시합니다. -->
  <div v-if="pkt">
    <!-- proto: {{ pkt.protocol }} <br> -->
    qos: {{ pkt.mqtt_qos }} <br>    
    Len: {{ pkt.length }} <br>  
    flag: {{ pkt.flags }} <br>
    topic: {{ pkt.topic }} <br>
    value: {{ pkt.value }} <br>
    protoName: {{ pkt.name }} <br>
    MQT_type: {{ pkt.mqtt_type }}<br>    
    MQT_Dup: {{ pkt.mqtt_dup }} <br>
    MQT_Qos: {{ pkt.mqtt_qos }}<br>
    MQT_Retain: {{ pkt.mqtt_retain }}<br>
    ---fixed---<br><br>
    ---connect---<br>
    proto_name: {{ pkt.connect_proto_name }}<br>
    ver: {{ pkt.connect_mqtt_level }}<br>
    usernameFlag: {{ pkt.connect_usernameflag }}<br>
    pwFlag: {{pkt.connect_passwordflag}}<br>
    wilretainFlag: {{ pkt.connect_willretainflag }}<br>
    wilQosFlag: {{ pkt.connect_willQOSflag }}<br>
    wilcleansess: {{ pkt.connect_cleansession }}<br>
    reserved: {{ pkt.connect_reserved }}<br>
    kAlive: {{ pkt.connect_keep_alive }}<br>
    clientID: {{ pkt.connect_clientId }}<br>
  </div>

  <!-- fixed Header -->
  <!-- MQTT패킷이라면 -->
  <!-- <div v-if="pkt.name == 'MQTT'"> -->
    <!-- 
      <p class="key-txt"><br><span class="val-txt"></span></p>
    -->
    <!-- <p class="key-txt">Type<br><span class="val-txt">{{ pkt.mqtt_type }}</span></p>
    <p class="key-txt">Dup Flag<br><span class="val-txt">{{ pkt.mqtt_dup }}</span></p>
    <p class="key-txt">QoS<br><span class="val-txt">{{ pkt.mqtt_qos }}</span></p>
    <p class="key-txt">Retain<br><span class="val-txt">{{ pkt.mqtt_retain }}</span></p> -->
  <div>
    <!-- <p class="key-txt">Len<br><span class="val-txt">{{ pkt.length }}</span></p>
    <p class="key-txt">Qos<br><span class="val-txt">{{ pkt.qos }}</span></p> -->
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