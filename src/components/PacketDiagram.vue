<template>
  <div
    :style="{
      width: '100%',
      height: '18px',
      display: 'flex',
    }"
  >
    <div class="byte-style byte-style-left"></div>
    <div
      v-for="index in 7"
      :key="index"
      class="byte-style-center byte-style"
    ></div>
    <div class="byte-style byte-style-left"></div>
    <div
      v-for="index in 6"
      :key="index"
      class="byte-style-center byte-style"
    ></div>
    <div class="byte-style-right byte-style"></div>
  </div>
  <div class="wrap-diagram">
    <div v-if="pkt.layer == 'MQTT'">
      <!-- MQTT-Fixed-header -->
      <div class="row-byte">
        <div
          class="text-overlay BL-left BL-top BL-bottom"
          :style="{ width: '25%' }"
        >
          <p class="title-txt">
            Type<br /><span class="val-txt">{{ pkt.mqtt_type }}</span>
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
      <div class="row-byte" v-if="mqtt_type == 'connect'">
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%' }"
        >
          <p class="title-txt">
            Protocol-Name-length<br /><span class="val-txt">{{
              pkt[mqtt_type].proto_name.length - 3
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '36px', height: '72px' }"
        >
          <p class="title-txt">
            Protocol-Name<br /><span class="val-txt">{{
              pkt[mqtt_type].proto_name
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '50%', top: '108px' }"
        >
          <p class="title-txt">
            MQTT-Version<br /><span class="val-txt">{{
              pkt[mqtt_type].mqtt_level
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '50%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{
              pkt[mqtt_type].usernameflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '56.25%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{
              pkt[mqtt_type].passwordflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '62.5%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{
              pkt[mqtt_type].willretainflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '12.5%', left: '68.75%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{
              pkt[mqtt_type].willQOSflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '81.25%', top: '108px' }"
        >
          <p class="title-txt">
            Flag<br /><span class="val-txt">{{ pkt[mqtt_type].willflag }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom"
          :style="{ width: '6.25%', left: '87.5%', top: '108px' }"
        >
          <p class="title-txt">
            Clean<br /><span class="val-txt">{{
              pkt[mqtt_type].cleansession
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '6.25%', left: '93.75%', top: '108px' }"
        >
          <p class="title-txt">
            reserved<br /><span class="val-txt">{{
              pkt[mqtt_type].reserved
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '144px' }"
        >
          <p class="title-txt">
            Keep-Alive<br /><span class="val-txt">{{
              pkt[mqtt_type].keep_alive
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '180px' }"
        >
          <p class="title-txt">
            Client-ID-Length<br /><span class="val-txt">{{
              pkt[mqtt_type].clientId.length - 3
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '216px' }"
        >
          <p class="title-txt">
            Client-ID ({{ pkt[mqtt_type].clientId.length - 3 }} byte)<br /><span
              class="val-txt"
              >{{ pkt[mqtt_type].clientId }}</span
            >
          </p>
        </div>
        <div
          v-if="pkt[mqtt_type].willflag"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '252px' }"
        >
          <p class="title-txt">
            Will-Topic<br /><span class="val-txt">{{
              pkt[mqtt_type].willtopic
            }}</span>
          </p>
        </div>
        <div
          v-if="pkt[mqtt_type].willflag"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '288px' }"
        >
          <p class="title-txt">
            Will-Message<br /><span class="val-txt">{{
              pkt[mqtt_type].willmsg
            }}</span>
          </p>
        </div>
        <div
          v-if="pkt[mqtt_type].usernameflag"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{
            width: '100%',
            top: pkt[mqtt_type].willflag ? '324px' : '252px',
          }"
        >
          <p class="title-txt">
            UserName<br /><span class="val-txt">{{
              pkt[mqtt_type].username
            }}</span>
          </p>
        </div>
        <div
          v-if="pkt[mqtt_type].passwordflag"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{
            width: '100%',
            top: pkt[mqtt_type].willflag
              ? pkt[mqtt_type].usernameflag
                ? '350px'
                : '324px'
              : pkt[mqtt_type].usernameflag
              ? '288px'
              : '252px',
          }"
        >
          <p class="title-txt">
            Password<br /><span class="val-txt">{{
              pkt[mqtt_type].password
            }}</span>
          </p>
        </div>
      </div>
      <div class="row-byte" v-if="mqtt_type == 'publish'">
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%' }"
        >
          <p class="title-txt">
            Topic-Length<br /><span class="val-txt">{{
              pkt[mqtt_type].topic.length - 3
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%', top: '36px' }"
        >
          <p class="title-txt">
            Topic ({{ pkt[mqtt_type].topic.length - 3 }} byte)<br /><span
              class="val-txt"
              >{{ pkt[mqtt_type].topic }}</span
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
              pkt[mqtt_type].msgid
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
            Message ({{ pkt[mqtt_type].msgvalue.length - 3 }} byte)<br /><span
              class="val-txt"
              >{{ pkt[mqtt_type].msgvalue }}</span
            >
          </p>
        </div>
      </div>
      <div class="row-byte" v-if="mqtt_type == 'connack'">
        <div class="text-overlay BL-left BL-bottom" :style="{ width: '50%' }">
          <p class="title-txt">
            Ack-Flag<br /><span class="val-txt">{{
              pkt[mqtt_type].ackflag
            }}</span>
          </p>
        </div>
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '50%', left: '50%' }"
        >
          <p class="title-txt">
            Return-Code<br /><span class="val-txt">{{
              pkt[mqtt_type].return_code
            }}</span>
          </p>
        </div>
      </div>
      <div
        class="row-byte"
        v-if="
          mqtt_type == 'puback' ||
          mqtt_type == 'pubrec' ||
          mqtt_type == 'pubcomp' ||
          mqtt_type == 'unsuback' ||
          mqtt_type == 'subscribe' ||
          mqtt_type == 'suback' ||
          mqtt_type == 'unsubscribe'
        "
      >
        <div
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '100%' }"
        >
          <p class="title-txt">
            Message-ID<br /><span class="val-txt">{{
              pkt[mqtt_type].msgid
            }}</span>
          </p>
        </div>
        <div
          v-if="mqtt_type == 'suback'"
          class="text-overlay BL-left BL-bottom BL-right"
          :style="{ width: '50%', top: '36px' }"
        >
          <p class="title-txt">
            Return-Code<br /><span class="val-txt">{{
              pkt[mqtt_type].return_code
            }}</span>
          </p>
        </div>
        <div v-if="mqtt_type == 'subscribe' || mqtt_type == 'unsubscribe'">
          <div
            v-for="(item, index) in pkt[mqtt_type].topic_filters"
            :key="index"
          >
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
              v-if="mqtt_type == 'subscribe'"
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
      <div v-if="mqtt_type == 'connect'">
        <div
          class="null-row"
          v-for="(item, i) in 6 +
          pkt[mqtt_type].willretainflag * 2 +
          pkt[mqtt_type].usernameflag +
          pkt[mqtt_type].passwordflag"
          :key="i"
        ></div>
      </div>
      <div v-if="mqtt_type == 'publish'">
        <div
          class="null-row"
          v-for="(item, i) in pkt.header.qos == 1 || pkt.header.qos == 2
            ? 3
            : 2"
          :key="i"
        ></div>
      </div>
      <div v-if="mqtt_type == 'publish'">
        <div
          class="null-row"
          v-for="(item, i) in pkt.header.qos == 1 || pkt.header.qos == 2
            ? 3
            : 2"
          :key="i"
        ></div>
      </div>
      <div v-if="mqtt_type == 'suback'">
        <div class="null-row"></div>
      </div>
      <div v-if="mqtt_type == 'subscribe' || mqtt_type == 'unsubscribe'">
        <div
          class="null-row"
          v-for="(item, i) in mqtt_type == 'subscribe'
            ? pkt[mqtt_type].topic_filters.length * 3
            : pkt[mqtt_type].topic_filters.length * 2"
          :key="i"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps } from "vue";

const props = defineProps({
  pkt: Object,
});

const mqtt_type = ref("");

watch(
  () => props.pkt,
  (newVal) => {
    if (newVal && newVal.mqtt_type) {
      mqtt_type.value = newVal.mqtt_type.toLowerCase();
    } else {
      mqtt_type.value = ""; // 또는 적절한 기본값 설정
    }
  }
);

onMounted(() => {
  console.log(props.pkt);
});
</script>

<style scoped>
.byte-style-right {
  background-image: linear-gradient(to top, black 50%, transparent 25%),
    linear-gradient(to top, black 90%, transparent 20%);
  background-size: 1.1px 100%;
  background-position: left, right;
  background-repeat: no-repeat;
}
.byte-style-left {
  background-image: linear-gradient(to top, black 90%, transparent 20%);
  background-size: 1.1px 100%;
  background-position: left;
  background-repeat: no-repeat;
}
.byte-style-center {
  background-image: linear-gradient(to top, black 50%, transparent 25%);
  background-size: 1.1px 100%;
  background-position: left;
  background-repeat: no-repeat;
}
.byte-style {
  height: 18px;
  width: 6.25%;
}
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
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
