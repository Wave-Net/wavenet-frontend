<template>
  <!-- selectedRowData를 사용하여 대화창 내용을 표시합니다. -->
  <div style="border-bottom: solid 0.1px; border-left: solid 0.2px; border-right: solid 0.1px; width: 12.5%; float: left; padding-bottom: 2%;"></div>
  <div style="border-bottom: solid 0.1px; border-left: solid 0.1px; border-right: solid 0.1px; width: 12.5%; float: left; padding-bottom: 2%;"></div>
  <div style="border-bottom: solid 0.1px; border-left: solid 0.1px; border-right: solid 0.1px; width: 12.5%; float: left; padding-bottom: 2%;"></div>
  <div style="border-bottom: solid 0.1px; border-left: solid 0.1px; border-right: solid 0.1px; width: 12.5%; float: left; padding-bottom: 2%;"></div>
  <div style="border-bottom: solid 0.1px; border-left: solid 0.1px; border-right: solid 0.1px; width: 12.5%; float: left; padding-bottom: 2%;"></div>
  <div style="border-bottom: solid 0.1px; border-left: solid 0.1px; border-right: solid 0.1px; width: 12.5%; float: left; padding-bottom: 2%;"></div>
  <div style="border-bottom: solid 0.1px; border-left: solid 0.1px; border-right: solid 0.1px; width: 12.5%; float: left; padding-bottom: 2%;"></div>
  <div style="border-bottom: solid 0.1px; border-left: solid 0.1px; border-right: solid 0.2px; width: 12.5%; float: left; padding-bottom: 2%;"></div>

  <div v-if="pkt.name == 'MQTT'">
    <!-- MQTT_fixed Header -->
    <p class="key-txt bit-4">Type<br><span class="val-txt">{{ pkt.type }}</span></p>
    <p class="key-txt bit-1">Dup<br><span class="val-txt">{{ pkt.header.dup }}</span></p>
    <p class="key-txt bit-2">QoS<br><span class="val-txt">{{ pkt.header.qos }}</span></p>
    <p class="key-txt bit-1">Retain<br><span class="val-txt">{{ pkt.header.retain }}</span></p>
    <p class="key-txt byte-1">Len<br><span class="val-txt">{{ pkt.header.msg_len }}</span></p>

    <!-- MQTT_CONNECT -->
    <div v-if="pkt.type == 'CONNECT'">
      <p class="key-txt byte-4">Protocol<br><span class="val-txt">{{ pkt.connect.proto_name }}</span></p>
      <p class="key-txt byte-1">Version<br><span class="val-txt">{{ pkt.connect.mqtt_level }}</span></p>
      <p class="key-txt bit-1">UsernameFlag<br><span class="val-txt">{{ pkt.connect.usernameflag }}</span></p>
      <p class="key-txt bit-1">PwFlag<br><span class="val-txt">{{ pkt.connect.passwordflag }}</span></p>
      <p class="key-txt bit-1">WillRetainFlag<br><span class="val-txt">{{ pkt.connect.willretainflag }}</span></p>
      <p class="key-txt bit-2">WillQosFlag<br><span class="val-txt">{{ pkt.connect.willQOSflag }}</span></p>
      <p class="key-txt bit-1">WillFlag<br><span class="val-txt">{{ pkt.connect.willflag }}</span></p>
      <p class="key-txt bit-1">Cleansession<br><span class="val-txt">{{ pkt.connect.cleansession }}</span></p>
      <p class="key-txt bit-1">Reserved<br><span class="val-txt">{{ pkt.connect.reserved }}</span></p>
      <p class="key-txt byte-2">KeepAlive<br><span class="val-txt">{{ pkt.connect.keep_alive }}</span></p>
      <p class="key-txt">ClientID<br><span class="val-txt">{{ pkt.connect.clientId }}</span></p>
      
      <p v-if="pkt.connect.willflag" class="key-txt">WillTopic<br><span class="val-txt">{{ pkt.connect.willtopic }}</span></p>
      <p v-if="pkt.connect.willflag" class="key-txt">Willmsg<br><span class="val-txt">{{ pkt.connect.willmsg }}</span></p>
      <p v-if="pkt.connect.usernameflag" class="key-txt">UserName<br><span class="val-txt">{{ pkt.connect.username }}</span></p>
      <p v-if="pkt.connect.passwordflag" class="key-txt">Password<br><span class="val-txt">{{ pkt.connect.password }}</span></p>
    </div>

    <!-- MQTT_CONNACK -->
    <div v-if="pkt.type == 'CONNACK'">
      <p class="key-txt byte-1">AckFlag<br><span class="val-txt">{{ pkt.connack.ackflag }}</span></p>
      <p class="key-txt byte-1">ReturnCode<br><span class="val-txt">{{ pkt.connack.return_code }}</span></p>
    </div>

    <!-- MQTT_PUBLISH -->
    <div v-if="pkt.type == 'PUBLISH'">
      <p class="key-txt">Topic<br><span class="val-txt">{{ pkt.publish.topic }}</span></p>
      <p class="key-txt byte-2">MsgID<br><span class="val-txt">{{ pkt.publish.msgid }}</span></p>
      <p class="key-txt">Message<br><span class="val-txt">{{ pkt.publish.msgvalue }}</span></p>
    </div>

    <!-- MQTT_PUBACK -->
    <div v-if="pkt.type == 'PUBACK'">
      <p class="key-txt byte-2">MsgID<br><span class="val-txt">{{ pkt.puback.msgid }}</span></p>
    </div>

    <!-- MQTT_PUBREC -->
    <div v-if="pkt.type == 'PUBREC'">
      <p class="key-txt byte-2">MsgID<br><span class="val-txt">{{ pkt.pubrec.msgid }}</span></p>
    </div>

    <!-- MQTT_PUBREL -->
    <div v-if="pkt.type == 'PUBREL'">
      <p class="key-txt byte-2">MsgID<br><span class="val-txt">{{ pkt.pubrel.msgid }}</span></p>
    </div>

    <!-- MQTT_PUBCOMP -->
    <div v-if="pkt.type == 'PUBCOMP'">
      <p class="key-txt byte-2">MsgID<br><span class="val-txt">{{ pkt.pubcomp.msgid }}</span></p>
    </div>

    <!-- MQTT_SUBSCRIBE --> <!--topic len에 따라서 크기가 달라질텐데 계산 해봐야할듯-->
    <!-- <div v-if="pkt.type == 'SUBSCRIBE'">
      <p class="key-txt byte-2">MsgID<br><span class="val-txt">{{ pkt.msgid }}</span></p>
      <div v-for="item in pkt.subscribe">
        <p class="key-txt">Topic<span class="val-txt">{{ item.topic }}</span></p>
        <p class="key-txt byte-1">Qos<span class="val-txt">{{ item.qos }}</span></p>      
      </div>
    </div> -->

    <!-- MQTT_SUBACK -->
    <!-- <div v-if="pkt.type == 'SUBACK'">
      <p class="key-txt byte-2">MsgID<br><span class="val-txt">{{ pkt.suback.msgid }}</span></p>
      <p class="key-txt byte-2">returnCode<br><span class="val-txt">{{ pkt.suback.returncode }}</span></p>
    </div> -->

    <!-- MQTT_UNSUBSCRIBE -->

    <!-- MQTT_UNSUBACK -->
    <!-- <div v-if="pkt.type=='UNSUBACK'">
      <p class="key-txt byte-2">MsgID<br><span class="val-txt">{{ pkt.unsuback.msgid }}</span></p>
    </div> -->
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
  font-style: italic;
}
.val-txt {
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
}
p {
  float: left;
  overflow: hidden;
  box-sizing: border-box;
  border: 0.1px solid black;
  padding-left: 1%;
  padding-right: 1%;
  margin: 0;
  max-width: 100%;
}
.bit-1 {
  width: 12.5%;
  height: 36px;
}
.bit-2{
  width: 25%;
  height: 36px;
}
.bit-4 {
  width: 50%;
  height: 36px;
}
.byte-1 {
  width: 100%;
  height: 36px;
}
.byte-2 {
  width: 100%;
  height: 72px;
}
.byte-4{
  width: 100%;
  height: 144px;
}
</style>
