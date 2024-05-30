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
            <div class="info">
              <h3 class="title">{{ packet.mqtt_type }}</h3>

              <div class="info-content">
                <p>Time : {{ packet.seconds_since_beginning }}</p>
                <div v-if="packet.mqtt_type == 'CONNECT'">
                  <p v-if="packet.connect.willtopic">
                    Will Topic : {{ packet.connect.willtopic }}
                  </p>
                  <p v-if="packet.connect.willmsg">
                    Will Message: {{ packet.connect.willmsg }}
                  </p>
                </div>
                <div v-if="packet.mqtt_type == 'CONNACK'">
                  <p>Return Code : {{ packet.connack.return_code }}</p>
                </div>
                <div v-if="packet.mqtt_type == 'PUBLISH'">
                  <p>Topic : {{ packet.publish.topic }}</p>
                </div>
                <div v-if="packet.mqtt_type == 'SUBSCRIBE'">
                  <div
                    v-for="(item, index) in packet.subscribe.topic_filters"
                    :key="index"
                  >
                    <p class="">Topic : {{ item.topic }}</p>
                  </div>
                </div>
                <div v-if="packet.mqtt_type == 'SUBACK'">
                  <p>Return Code : {{ packet.suback.return_code }}</p>
                </div>
                <div v-if="packet.mqtt_type == 'UNSUBSCRIBE'">
                  <div
                    v-for="(item, index) in packet.unsubscribe.topic_filters"
                    :key="index"
                  >
                    <p class="">Topic : {{ item.topic }}</p>
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
  border: solid rgb(162, 214, 238);
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
  color: rgb(104, 104, 104);
  border-radius: 25px;
  padding: 10px;
}

/* Title of the Flow Msg */
.title {
  color: rgb(114, 158, 179);
  position: relative;
}

/* Timeline dot */
.title::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  border: 3px solid rgb(162, 214, 238);
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
  left: -35px;
  top: 6px;
}
/* 화살표 */
.flow-msg.left > .info > .title::after {
  left: -20.6px;
  top: 5.7px;
  border-color: transparent transparent transparent rgb(162, 214, 238);
}

.flow-msg.right > .info > .title::before {
  right: -35px;
  top: 6px;
}

.flow-msg.right > .info > .title::after {
  right: -20px;
  top: 5px;
  border-color: transparent rgb(162, 214, 238) transparent transparent;
}

.flow-msg.right > .info > .title {
  text-align: right;
}

/* Removing the border if it is the first Flow Msg */
.flow-msg-group:first-child::before {
  top: -15px;
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
  top: 30px;
  z-index: 1;
}
.title-ip {
  background-color: rgb(162, 214, 238);
  text-align: center;
  border-radius: 10px;
  padding: 5px;
}
.info-content {
  max-width: 400px;
}
</style>
