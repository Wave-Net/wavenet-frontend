<template>
  <!-- selectedRowData를 사용하여 대화창 내용을 표시합니다. -->

  <div v-if="pkt.name == 'MQTT'">
    <!-- MQTT_fixed Header -->
    <p class="key-txt">Type<br><span class="val-txt">{{ pkt.type }}</span></p>
    <p class="key-txt">Dup<br><span class="val-txt">{{ pkt.header.dup }}</span></p>
    <p class="key-txt">QoS<br><span class="val-txt">{{ pkt.header.qos }}</span></p>
    <p class="key-txt">Retain<br><span class="val-txt">{{ pkt.header.retain }}</span></p>
    <p class="key-txt">Len<br><span class="val-txt">{{ pkt.header.msg_len }}</span></p>

    <!-- MQTT_CONNECT -->
    <div v-if="pkt.type == 'CONNECT'">
      <p class="key-txt">Protocol<br><span class="val-txt">{{ pkt.connect.proto_name }}</span></p>
      <p class="key-txt">Version<br><span class="val-txt">{{ pkt.connect.mqtt_level }}</span></p>
      <p class="key-txt">UsernameFlag<br><span class="val-txt">{{ pkt.connect.usernameflag }}</span></p>
      <p class="key-txt">PwFlag<br><span class="val-txt">{{ pkt.connect.passwordflag }}</span></p>
      <p class="key-txt">WillRetainFlag<br><span class="val-txt">{{ pkt.connect.willretainflag }}</span></p>
      <p class="key-txt">WillQosFlag<br><span class="val-txt">{{ pkt.connect.willQOSflag }}</span></p>
      <p class="key-txt">WillFlag<br><span class="val-txt">{{ pkt.connect.willflag }}</span></p>
      <p class="key-txt">Cleansession<br><span class="val-txt">{{ pkt.connect.cleansession }}</span></p>
      <p class="key-txt">Reserved<br><span class="val-txt">{{ pkt.connect.reserved }}</span></p>
      <p class="key-txt">KeepAlive<br><span class="val-txt">{{ pkt.connect.keep_alive }}</span></p>
      <p class="key-txt">ClientID<br><span class="val-txt">{{ pkt.connect.clientId }}</span></p>
      
      <p v-if="pkt.connect.willflag" class="key-txt">WillTopic<br><span class="val-txt">{{ pkt.connect.willtopic }}</span></p>
      <p v-if="pkt.connect.willflag" class="key-txt">Willmsg<br><span class="val-txt">{{ pkt.connect.willmsg }}</span></p>
      <p v-if="pkt.connect.usernameflag" class="key-txt">UserName<br><span class="val-txt">{{ pkt.connect.username }}</span></p>
      <p v-if="pkt.connect.passwordflag" class="key-txt">Password<br><span class="val-txt">{{ pkt.connect.password }}</span></p>
    </div>

    <!-- MQTT_CONNACK -->
    <div v-if="pkt.type == 'CONNACK'">
      <p class="key-txt">AckFlag<br><span class="val-txt">{{ pkt.connack.ackflag }}</span></p>
      <p class="key-txt">ReturnCode<br><span class="val-txt">{{ pkt.connack.return_code }}</span></p>
    </div>

    <!-- MQTT_PUBLISH -->
    <div v-if="pkt.type == 'PUBLISH'">
      <p class="key-txt">Topic<br><span class="val-txt">{{ pkt.publish.topic }}</span></p>
      <p class="key-txt">MsgID<br><span class="val-txt">{{ pkt.publish.msgid }}</span></p>
      <p class="key-txt">Message<br><span class="val-txt">{{ pkt.publish.msgvalue }}</span></p>
    </div>

    <!-- MQTT_PUBACK -->
    <div v-if="pkt.type == 'PUBACK'">
      <p class="key-txt">MsgID<br><span class="val-txt">{{ pkt.puback.msgid }}</span></p>
    </div>

    <!-- MQTT_PUBREC -->
    <div v-if="pkt.type == 'PUBREC'">
      <p class="key-txt">MsgID<br><span class="val-txt">{{ pkt.pubrec.msgid }}</span></p>
    </div>

    <!-- MQTT_PUBREL -->
    <div v-if="pkt.type == 'PUBREL'">
      <p class="key-txt">MsgID<br><span class="val-txt">{{ pkt.pubrel.msgid }}</span></p>
    </div>

    <!-- MQTT_PUBCOMP -->
    <div v-if="pkt.type == 'PUBCOMP'">
      <p class="key-txt">MsgID<br><span class="val-txt">{{ pkt.pubcomp.msgid }}</span></p>
    </div>
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

<style scoped>
.key-txt {
  font-size: 10px;
  text-align: center;
}
.val-txt {
  font-size: 16px;
}
p {
  float: left;
  overflow: auto;
  box-sizing: border-box;
  border: 0.1px solid black;
  padding-left: 1%;
  padding-right: 1%;
  margin: 0;
}
.bit-1 {
  
}
.bit-4 {

}
.byte-1 {

}
.byte-2 {

}
</style>