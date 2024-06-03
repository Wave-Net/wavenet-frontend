<template>
  <div>
    <div class="title-box">
      <p class="title-ip">Source IP<br />{{ sourceIP }}</p>
      <p class="title-ip">Destination IP<br />{{ destinationIP }}</p>
    </div>
    <div class="timeline">
      <div class="outer">
        <div
          v-for="(group, groupIndex) in groupedFlowchartPackets"
          :key="groupIndex"
          :class="['flow-msg-group', group.direction]"
        >
          <div
            v-for="(packet, packetIndex) in group.packets"
            :key="packetIndex"
            :class="['flow-msg', group.direction]"
          >
            <div
              class="info"
              @click="emitPacketIndex(packet.index)"
              :class="{ highlight: isHighlighted(packet.index) }"
            >
              <h3 class="title">{{ packet.mqtt_type }}</h3>

              <div class="info-content">
                <p class="font-size-small">
                  Time : {{ packet.seconds_since_beginning }}
                </p>
                <div v-if="packet.mqtt_type == 'CONNECT'">
                  <p v-if="packet.connect.willtopic" class="font-size-small">
                    Will Topic : {{ packet.connect.willtopic }}
                  </p>
                  <p v-if="packet.connect.willmsg" class="font-size-small">
                    Will Message: {{ packet.connect.willmsg }}
                  </p>
                </div>
                <div v-if="packet.mqtt_type == 'CONNACK'">
                  <p class="font-size-small">
                    Return Code : {{ packet.connack.return_code }}
                  </p>
                </div>
                <div v-if="packet.mqtt_type == 'PUBLISH'">
                  <p class="font-size-small">
                    Topic : {{ packet.publish.topic }}
                  </p>
                </div>
                <div v-if="packet.mqtt_type == 'SUBSCRIBE'">
                  <div
                    v-for="(item, index) in packet.subscribe.topic_filters"
                    :key="index"
                  >
                    <p class="font-size-small">Topic : {{ item.topic }}</p>
                  </div>
                </div>
                <div v-if="packet.mqtt_type == 'SUBACK'">
                  <p class="font-size-small">
                    Return Code : {{ packet.suback.return_code }}
                  </p>
                </div>
                <div v-if="packet.mqtt_type == 'UNSUBSCRIBE'">
                  <div
                    v-for="(item, index) in packet.unsubscribe.topic_filters"
                    :key="index"
                  >
                    <p class="font-size-small">Topic : {{ item.topic }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flowchart_packets: Array,
    sourceIP: String,
    destinationIP: String,
    highlightedIndex: Number,
  },
  methods: {
    emitPacketIndex(index) {
      this.$emit("packetIndexSelected", index);
    },
    isHighlighted(index) {
      return this.highlightedIndex === index;
    },
  },
  computed: {
    groupedFlowchartPackets() {
      const groups = [];
      let currentGroup = null;

      for (let i = 0; i < this.flowchart_packets.length; i++) {
        const packet = this.flowchart_packets[i];
        // 선택한 행의 두개의 ip주소만 필터링해서 플로우차트에 표시
        if (
          (packet.src == this.sourceIP || packet.src === this.destinationIP) &&
          (packet.dst === this.sourceIP || packet.dst === this.destinationIP)
        ) {
          const direction = packet.src === this.sourceIP ? "left" : "right";

          if (!currentGroup || currentGroup.direction !== direction) {
            currentGroup = { direction, packets: [] };
            groups.push(currentGroup);
          }

          currentGroup.packets.push(packet);
        }
      }

      return groups;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Timeline Container */
.timeline {
  padding: 20px 20px 20px;
  padding-left: 40px;
}

.outer {
  position: relative;
}

.flow-msg-group {
  position: relative;
  max-width: 400px;
  margin-top: 30px;
}

/* Global ::before */
.flow-msg-group::before {
  content: "";
  position: absolute;
  width: 50%;
  border: solid #7bc2d0;
  top: -17.5px;
  bottom: -17.5px;
}

.flow-msg-group.left::before {
  left: 0;
  border-width: 5px 0 5px 5px;
  border-radius: 50px 0 0 50px;
}

.flow-msg-group.right::before {
  right: 0;
  border-width: 5px 5px 5px 0;
  border-radius: 0 50px 50px 0;
}

/* Flow Msg container */
.flow-msg {
  position: relative;
  max-width: 400px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.flow-msg.left {
  padding-left: 20px;
}

.flow-msg.right {
  padding-right: 20px;
}

/* Information about the timeline */
.info {
  display: flex;
  flex-direction: column;
  background: #d6d6d6e4;
  color: rgb(48, 48, 48);
  border-radius: 25px;
  padding: 10px;
  /* font-size: 10px; */
}
.info.highlight {
  background-color: #7bc2d045; /* Info 하이라이트 스타일 */
}

/* Title of the Flow Msg */
.title {
  color: rgb(114, 158, 179);
  position: relative;
  font-family: "Poppins", sans-serif;
  font-size: medium;
}

/* Timeline dot */
.title::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  border: 3px solid #7bc2d0;
}

/* Arrow */
.title::after {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 8px;
}
/* 동그라미 */
.flow-msg.left > .info > .title::before {
  left: -32.5px;
  top: 12.5px;
}
/* 화살표 */
.flow-msg.left > .info > .title::after {
  left: -21px;
  top: 10px;
  border-width: 8px 0px 8px 10px; /* 오른쪽 방향의 border-width를 늘림 */
  border-color: transparent transparent transparent #7bc2d0;
}

.flow-msg.right > .info > .title::before {
  right: -32.4px;
  top: 12.5px;
}

.flow-msg.right > .info > .title::after {
  right: -21px;
  top: 9.5px;
  border-width: 8px 10px 8px 0; /* 오른쪽 방향의 border-width를 늘림 */
  border-color: transparent #7bc2d0 transparent transparent;
}

.flow-msg.right > .info > .title {
  text-align: right;
}

/* Removing the border if it is the first Flow Msg */
.flow-msg-group:first-child::before {
  top: -51px;
}

.flow-msg-group.left:first-child::before {
  border-top: 0;
  border-top-left-radius: 0;
}

.flow-msg-group.right:first-child::before {
  border-top: 0;
  border-top-right-radius: 0;
}

/* Removing the border if it is the last Flow Msg and it's left */
.flow-msg-group.left:last-child::before {
  border-bottom: 0;
  border-bottom-left-radius: 0;
}

/* Removing the border if it is the last Flow Msg and it's right */
.flow-msg-group.right:last-child::before {
  border-bottom: 0;
  border-bottom-right-radius: 0;
}
.title-box {
  display: flex;
  justify-content: space-between;
  max-width: 480px;
  position: sticky;
  top: 0px;
  z-index: 1;
  padding: 5px 5px 0.2px 5px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  background-color: white;
}
.title-ip {
  background-color: #7bc2d0;
  text-align: center;
  border-radius: 10px;
  padding: 5px;
}
.info-content {
  max-width: 400px;
  font-family: "Poppins", sans-serif;
}
.font-size-small {
  font-size: small;
}
</style>
