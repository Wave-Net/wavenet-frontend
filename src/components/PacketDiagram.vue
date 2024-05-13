<template>
  <div class="wrap-diagram">
    <div class="bit-left"></div>
    <div class="bit-middle" v-for="(item, i) in 6" :key="i"></div>
    <div class="bit-right"></div>

    <div v-if="pkt.name == 'MQTT'">
      <!-- MQTT_fixed Header -->
      <p class="key-txt bit-4">
        Type<br /><span class="val-txt">{{ pkt.type }}</span>
      </p>
      <p class="key-txt bit-1">
        Dup<br /><span class="val-txt">{{ pkt.header.dup }}</span>
      </p>
      <p class="key-txt bit-2">
        QoS<br /><span class="val-txt">{{ pkt.header.qos }}</span>
      </p>
      <p class="key-txt bit-1">
        Retain<br /><span class="val-txt">{{ pkt.header.retain }}</span>
      </p>
      <p class="key-txt byte-1">
        Remaing Len<br /><span class="val-txt">{{ pkt.header.msg_len }}</span>
      </p>

      <!-- MQTT_CONNECT -->
      <div v-if="pkt.type == 'CONNECT'">
        <p class="key-txt byte-2">
          ProtocolNameLength<br /><span class="val-txt">{{
            pkt.connect.proto_name.length - 3
          }}</span>
        </p>
        <p class="key-txt byte-4">
          Protocol<br /><span class="val-txt">{{
            pkt.connect.proto_name
          }}</span>
        </p>
        <p class="key-txt byte-1">
          Version<br /><span class="val-txt">{{ pkt.connect.mqtt_level }}</span>
        </p>
        <p class="key-txt bit-1">
          UsernameFlag<br /><span class="val-txt">{{
            pkt.connect.usernameflag
          }}</span>
        </p>
        <p class="key-txt bit-1">
          PwFlag<br /><span class="val-txt">{{
            pkt.connect.passwordflag
          }}</span>
        </p>
        <p class="key-txt bit-1">
          WillRetainFlag<br /><span class="val-txt">{{
            pkt.connect.willretainflag
          }}</span>
        </p>
        <p class="key-txt bit-2">
          WillQosFlag<br /><span class="val-txt">{{
            pkt.connect.willQOSflag
          }}</span>
        </p>
        <p class="key-txt bit-1">
          WillFlag<br /><span class="val-txt">{{ pkt.connect.willflag }}</span>
        </p>
        <p class="key-txt bit-1">
          Cleansession<br /><span class="val-txt">{{
            pkt.connect.cleansession
          }}</span>
        </p>
        <p class="key-txt bit-1">
          Reserved<br /><span class="val-txt">{{ pkt.connect.reserved }}</span>
        </p>
        <p class="key-txt byte-2">
          KeepAlive<br /><span class="val-txt">{{
            pkt.connect.keep_alive
          }}</span>
        </p>
        <p class="key-txt byte-2">
          ClientIdLength<br /><span class="val-txt">{{
            pkt.connect.clientId.length - 3
          }}</span>
        </p>
        <p class="key-txt byte-non">
          ClientID ({{ pkt.connect.clientId.length - 3 }} byte)<br /><span
            class="val-txt"
            >{{ pkt.connect.clientId }}</span
          >
        </p>
        <p v-if="pkt.connect.willflag" class="key-txt byte-non">
          WillTopic ({{ pkt.connect.willtopic.length }} byte)<br /><span
            class="val-txt"
            >{{ pkt.connect.willtopic }}</span
          >
        </p>
        <p v-if="pkt.connect.willflag" class="key-txt byte-non">
          Willmsg ({{ pkt.connect.willmsg.length }} byte)<br /><span
            class="val-txt"
            >{{ pkt.connect.willmsg }}</span
          >
        </p>
        <p v-if="pkt.connect.usernameflag" class="key-txt byte-non">
          UserName ({{ pkt.connect.username.length }} byte)<br /><span
            class="val-txt"
            >{{ pkt.connect.username }}</span
          >
        </p>
        <p v-if="pkt.connect.passwordflag" class="key-txt byte-non">
          Password ({{ pkt.connect.password.length }} byte)<br /><span
            class="val-txt"
            >{{ pkt.connect.password }}</span
          >
        </p>
      </div>

      <!-- MQTT_CONNACK -->
      <div v-if="pkt.type == 'CONNACK'">
        <p class="key-txt byte-1">
          AckFlag<br /><span class="val-txt">{{ pkt.connack.ackflag }}</span>
        </p>
        <p class="key-txt byte-1">
          ReturnCode<br /><span class="val-txt">{{
            pkt.connack.return_code
          }}</span>
        </p>
      </div>

      <!-- MQTT_PUBLISH -->
      <div v-if="pkt.type == 'PUBLISH'">
        <p class="key-txt byte-2">
          TopicLen<br /><span class="val-txt">{{
            pkt.publish.topic.length - 3
          }}</span>
        </p>
        <p class="key-txt byte-non">
          Topic ({{ pkt.publish.topic.length - 3 }} byte)<br /><span
            class="val-txt"
            >{{ pkt.publish.topic }}</span
          >
        </p>
        <p v-if="pkt.publish.msgid" class="key-txt byte-2">
          <!--Qos==0이면 msgid는 없음-->
          MsgID<br /><span class="val-txt">{{ pkt.publish.msgid }}</span>
        </p>
        <p class="key-txt byte-non">
          Message ({{ pkt.publish.msgvalue.length - 3 }} byte)<br /><span
            class="val-txt"
            >{{ pkt.publish.msgvalue }}</span
          >
        </p>
      </div>

      <!-- MQTT_PUBACK -->
      <div v-if="pkt.type == 'PUBACK'">
        <p class="key-txt byte-2">
          MsgID<br /><span class="val-txt">{{ pkt.puback.msgid }}</span>
        </p>
      </div>

      <!-- MQTT_PUBREC -->
      <div v-if="pkt.type == 'PUBREC'">
        <p class="key-txt byte-2">
          MsgID<br /><span class="val-txt">{{ pkt.pubrec.msgid }}</span>
        </p>
      </div>

      <!-- MQTT_PUBREL -->
      <div v-if="pkt.type == 'PUBREL'">
        <p class="key-txt byte-2">
          MsgID<br /><span class="val-txt">{{ pkt.pubrel.msgid }}</span>
        </p>
      </div>

      <!-- MQTT_PUBCOMP -->
      <div v-if="pkt.type == 'PUBCOMP'">
        <p class="key-txt byte-2">
          MsgID<br /><span class="val-txt">{{ pkt.pubcomp.msgid }}</span>
        </p>
      </div>

      <!-- MQTT_SUBSCRIBE -->
      <div v-if="pkt.type == 'SUBSCRIBE'">
        <p class="key-txt byte-2">
          MsgID<br /><span class="val-txt">{{ pkt.subscribe.msgid }}</span>
        </p>
        <div v-for="(item, index) in pkt.subscribe.topic_filters" :key="index">
          <p class="key-txt byte-2">
            TopicLen<br /><span class="val-txt">{{ item.topic.length }}</span>
          </p>
          <p class="key-txt byte-non">
            Topic ({{ item.topic.length }} byte)<br /><span class="val-txt">{{
              item.topic
            }}</span>
          </p>
          <p class="key-txt byte-1">
            Qos<br /><span class="val-txt">{{ item.qos }}</span>
          </p>
        </div>
      </div>

      <!-- MQTT_SUBACK -->
      <div v-if="pkt.type == 'SUBACK'">
        <p class="key-txt byte-2">
          MsgID<br /><span class="val-txt">{{ pkt.suback.msgid }}</span>
        </p>
        <p class="key-txt byte-1">
          returnCode<br /><span class="val-txt">{{
            pkt.suback.return_code
          }}</span>
        </p>
      </div>

      <!-- MQTT_UNSUBSCRIBE -->
      <div v-if="pkt.type == 'UNSUBSCRIBE'">
        <p class="key-txt byte-2">
          MsgID<br /><span class="val-txt">{{ pkt.unsubscribe.msgid }}</span>
        </p>
        <div
          v-for="(item, index) in pkt.unsubscribe.topic_filters"
          :key="index"
        >
          <p class="key-txt byte-2">
            TopicLen<br /><span class="val-txt">{{ item.topic.length }}</span>
          </p>
          <p class="key-txt byte-non">
            Topic ({{ item.topic.length }} byte)<br /><span class="val-txt">{{
              item.topic
            }}</span>
          </p>
        </div>
      </div>

      <!-- MQTT_UNSUBACK -->
      <div v-if="pkt.type == 'UNSUBACK'">
        <p class="key-txt byte-2">
          MsgID<br /><span class="val-txt">{{ pkt.unsuback.msgid }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pkt: Object,
  },
  mounted() {
    console.log(this.pkt);
  },
  // 나머지 코드
};
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
.bit-2 {
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
.byte-4 {
  width: 100%;
  height: 144px;
}
.byte-non {
  width: 100%;
  height: auto;
}
.bit-left {
  box-sizing: border-box;
  border-bottom: solid 0.1px;
  border-left: 0.1px solid;
  border-right: solid 0.1px;
  width: 12.5%;
  float: left;
  padding-bottom: 2%;
}
.bit-middle {
  box-sizing: border-box;
  border-bottom: solid 0.1px;
  border-left: solid 0.1px;
  border-right: solid 0.1px;
  width: 12.5%;
  float: left;
  padding-bottom: 2%;
}
.bit-right {
  box-sizing: border-box;
  border-bottom: solid 0.1px;
  border-left: solid 0.1px;
  border-right: solid 0.1px;
  width: 12.5%;
  float: left;
  padding-bottom: 2%;
}

.wrap-diagram {
  float: none;
  box-sizing: border-box;
  width: 100%;
}
</style>
