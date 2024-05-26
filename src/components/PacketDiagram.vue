<template>
  <div class="wrap-diagram">
    <div v-if="pkt.name == 'MQTT'">
      <!-- MQTT-Fixed-header -->
      <div class="row-byte">
        <div
          class="text-overlay BL-left BL-top BL-bottom"
          :style="{ width: '25%' }"
        >
          <p class="title-txt">
            Type<br /><span class="val-txt">{{ pkt.type }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-top BL-bottom"
          :style="{ left: '25%', width: '6.25%' }"
        >
          <p class="title-txt">
            Dup<br /><span class="val-txt">{{ pkt.header.dup }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-top BL-bottom"
          :style="{ left: '31.25%', width: '12.5%' }"
        >
          <p class="title-txt">
            Qos<br /><span class="val-txt">{{ pkt.header.qos }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-top BL-bottom"
          :style="{ left: '43.75%', width: '6.25%' }"
        >
          <p class="title-txt">
            Retain<br /><span class="val-txt">{{ pkt.header.retain }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-top BL-bottom BL-right"
          :style="{ left: '50%', width: '50%' }"
        >
          <p class="title-txt">
            Message-Length<br /><span class="val-txt">{{
              pkt.header.msg_len
            }}</span>
          </p>
        </div>
      </div>
      <!-- MQTT-msgType-header -->
      <div class="row-byte" v-if="msgtype == 'connect'">
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%' }"
        >
          <p class="title-txt">
            Protocol-Name-length<br /><span class="val-txt">{{
              pkt[msgtype].proto_name.length - 3
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '36px', height: '72px' }"
        >
          <p class="title-txt">
            Protocol-Name<br /><span class="val-txt">{{
              pkt[msgtype].proto_name
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '50%', top: '108px' }"
        >
          <p class="title-txt">
            MQTT-Version<br /><span class="val-txt">{{
              pkt[msgtype].mqtt_level
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '50%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{
              pkt[msgtype].usernameflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '56.25%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{
              pkt[msgtype].passwordflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '62.5%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{
              pkt[msgtype].willretainflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '12.5%', left: '68.75%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{
              pkt[msgtype].willQOSflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '81.25%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{ pkt[msgtype].willflag }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '87.5%', top: '108px' }"
        >
          <p class="title-txt">
            Clean<br /><span class="val-txt">{{
              pkt[msgtype].cleansession
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '6.25%', left: '93.75%', top: '108px' }"
        >
          <p class="title-txt">
            reserved<br /><span class="val-txt">{{
              pkt[msgtype].reserved
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '144px' }"
        >
          <p class="title-txt">
            Keep-Alive<br /><span class="val-txt">{{
              pkt[msgtype].keep_alive
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '180px' }"
        >
          <p class="title-txt">
            Client-ID-Length<br /><span class="val-txt">{{
              pkt[msgtype].clientId.length - 3
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '216px' }"
        >
          <p class="title-txt">
            Client-ID ({{ pkt[msgtype].clientId.length - 3 }} byte)<br /><span
              class="val-txt"
              >{{ pkt[msgtype].clientId }}</span
            >
          </p>
        </div>
        <div
          v-if="pkt[msgtype].willflag"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '252px' }"
        >
          <p class="title-txt">
            Will-Topic<br /><span class="val-txt">{{
              pkt[msgtype].willtopic
            }}</span>
          </p>
        </div>
        <div
          v-if="pkt[msgtype].willflag"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '288px' }"
        >
          <p class="title-txt">
            Will-Message<br /><span class="val-txt">{{
              pkt[msgtype].willmsg
            }}</span>
          </p>
        </div>
        <div
          v-if="pkt[msgtype].usernameflag"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{
            width: '100%',
            top: pkt[msgtype].willflag ? '324px' : '252px',
          }"
        >
          <p class="title-txt">
            UserName<br /><span class="val-txt">{{
              pkt[msgtype].username
            }}</span>
          </p>
        </div>
        <div
          v-if="pkt[msgtype].passwordflag"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{
            width: '100%',
            top: pkt[msgtype].willflag
              ? pkt[msgtype].usernameflag
                ? '350px'
                : '324px'
              : pkt[msgtype].usernameflag
              ? '288px'
              : '252px',
          }"
        >
          <p class="title-txt">
            Password<br /><span class="val-txt">{{
              pkt[msgtype].password
            }}</span>
          </p>
        </div>
      </div>
      <div class="row-byte" v-if="msgtype == 'publish'">
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%' }"
        >
          <p class="title-txt">
            Topic-Length<br /><span class="val-txt">{{
              pkt[msgtype].topic.length - 3
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '36px' }"
        >
          <p class="title-txt">
            Topic ({{ pkt[msgtype].topic.length - 3 }} byte)<br /><span
              class="val-txt"
              >{{ pkt[msgtype].topic }}</span
            >
          </p>
        </div>
        <div
          v-if="pkt.header.qos == 1 || pkt.header.qos == 2"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '72px' }"
        >
          <p class="title-txt">
            Message-ID<br /><span class="val-txt">{{
              pkt[msgtype].msgid
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{
            width: '100%',
            top: pkt.header.qos == 0 ? '72px' : '108px',
          }"
        >
          <p class="title-txt">
            Message ({{ pkt[msgtype].msgvalue.length - 3 }} byte)<br /><span
              class="val-txt"
              >{{ pkt[msgtype].msgvalue }}</span
            >
          </p>
        </div>
      </div>
      <div class="row-byte" v-if="msgtype == 'connack'">
        <div class="text-overlay BL-left BL-bottom" :style="{ width: '50%' }">
          <p class="title-txt">
            Ack-Flag<br /><span class="val-txt">{{
              pkt[msgtype].ackflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '50%', left: '50%' }"
        >
          <p class="title-txt">
            Return-Code<br /><span class="val-txt">{{
              pkt[msgtype].return_code
            }}</span>
          </p>
        </div>
      </div>
      <div
        class="row-byte"
        v-if="
          msgtype == 'puback' ||
          msgtype == 'pubrec' ||
          msgtype == 'pubcomp' ||
          msgtype == 'unsuback' ||
          msgtype == 'subscribe' ||
          msgtype == 'suback' ||
          msgtype == 'unsubscribe'
        "
      >
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%' }"
        >
          <p class="title-txt">
            Message-ID<br /><span class="val-txt">{{
              pkt[msgtype].msgid
            }}</span>
          </p>
        </div>
        <div
          v-if="msgtype == 'suback'"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '50%', top: '36px' }"
        >
          <p class="title-txt">
            Return-Code<br /><span class="val-txt">{{
              pkt[msgtype].return_code
            }}</span>
          </p>
        </div>
        <div v-if="msgtype == 'subscribe' || msgtype == 'unsubscribe'">
          <div v-for="(item, index) in pkt[msgtype].topic_filters" :key="index">
            <div
              class="text-overlay BL-left BL-bottom BL-right"
              :style="{ width: '100%', top: 36 * (index + 1) + 'px' }"
            >
              <p class="title-txt">
                Topic-Length<br /><span class="val-txt">{{
                  item.topic.length
                }}</span>
              </p>
            </div>
            <!-- topic:이 부분 byte 조정 필요 -->
            <div
              class="text-overlay BL-left BL-bottom BL-right"
              :style="{ width: '100%', top: 36 * (index + 2) + 'px' }"
            >
              <p class="title-txt">
                Topic ({{ item.topic.length }} byte)<br /><span
                  class="val-txt"
                  >{{ item.topic }}</span
                >
              </p>
            </div>
            <div
              v-if="msgtype == 'subscribe'"
              class="text-overlay BL-left BL-bottom BL-right"
              :style="{ width: '50%', top: 36 * (index + 3) + 'px' }"
            >
              <p class="title-txt">
                Topic-Qos<br /><span class="val-txt">{{ item.qos }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- NULL-ROW -->
      <div v-if="msgtype == 'connect'">
        <div
          class="null-row"
          v-for="(item, i) in 6 +
          pkt[msgtype].willretainflag * 2 +
          pkt[msgtype].usernameflag +
          pkt[msgtype].passwordflag"
          :key="i"
        ></div>
      </div>
      <div v-if="msgtype == 'publish'">
        <div
          class="null-row"
          v-for="(item, i) in pkt.header.qos == 1 || pkt.header.qos == 2
            ? 3
            : 2"
          :key="i"
        ></div>
      </div>
      <div v-if="msgtype == 'publish'">
        <div
          class="null-row"
          v-for="(item, i) in pkt.header.qos == 1 || pkt.header.qos == 2
            ? 3
            : 2"
          :key="i"
        ></div>
      </div>
      <div v-if="msgtype == 'suback'">
        <div class="null-row"></div>
      </div>
      <div v-if="msgtype == 'subscribe' || msgtype == 'unsubscribe'">
        <div
          class="null-row"
          v-for="(item, i) in msgtype == 'subscribe'
            ? pkt[msgtype].topic_filters.length * 3
            : pkt[msgtype].topic_filters.length * 2"
          :key="i"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pkt: Object,
  },
  data() {
    return {
      msgtype: "", // msgtype 변수 초기화
    };
  },
  // msg-type이 달라질때마다 전에 렌더링된 msgtype이 남아버려서 오류 발생해서 watch사용
  watch: {
    pkt(newVal) {
      this.msgtype = `${newVal.type}`.toLowerCase(); // msgtype 업데이트
    },
  },
  created() {
    this.msgtype = `${this.pkt.type}`.toLowerCase(); // msgtype 초기화
  },
  mounted() {
    console.log(this.pkt);
  },
};
</script>

<style scoped>
.null-row {
  display: flex;
  flex-direction: column;
  height: 36px;
  /* width: 100%; */
}
.val-txt {
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
}
.title-txt {
  font-size: 10px;
  text-align: center;
  font-style: italic;
  margin: 0;
}
.text-overlay {
  position: absolute;
  height: 36px;
  text-align: center;
}
.BL-right {
  border-right: 0.1px solid;
}
.BL-left {
  border-left: 0.1px solid;
}
.BL-bottom {
  border-bottom: 0.1px solid;
}
.BL-top {
  border-top: 0.1px solid;
}
.row-byte {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 36px;
}
.wrap-diagram {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
