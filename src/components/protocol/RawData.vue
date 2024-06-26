<template>
  <div class="raw-data">
    <div v-for="(field, key) in fields" :key="key" class="accordion-item">
      <div
        class="accordion-header"
        :class="{ active: openPanels.includes(key) }"
        @click="toggle(key)"
      >
        <i
          :class="
            openPanels.includes(key) ? 'pi pi-angle-down' : 'pi pi-angle-right'
          "
        ></i>
        <span :class="{ 'bold-text': !openPanels.includes(key) }">{{
          getHeaderName(key)
        }}</span>
        <span class="original-title">({{ key }})</span>
      </div>
      <div v-if="openPanels.includes(key)" class="accordion-content">
        <div @click.stop="highlight(key)">
          Value : <span class="medium-text">{{ field.value }}</span>
        </div>
        <div @click.stop="highlight(key)">
          Raw Bytes : <span class="medium-text">{{ field.raw_bytes }}</span>
        </div>
        <div @click.stop="highlight(key)">
          ASCII : <span class="medium-text">{{ field.ascii }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, onUnmounted } from "vue";
import { eventBus } from "@/eventBus";

const props = defineProps({
  fields: {
    type: Object as () => Record<
      string,
      { value: string; raw_bytes: string; ascii: string; field_length: number }
    >,
    required: true,
  },
});
console.log(props);

const openPanels = ref<string[]>([]);

const toggle = (key: string) => {
  if (openPanels.value.includes(key)) {
    openPanels.value = openPanels.value.filter((panel) => panel !== key);
    eventBus.emit("highlightField", key, false); // emit event to remove highlight
  } else {
    openPanels.value.push(key);
    eventBus.emit("highlightField", key, true); // emit event to highlight
  }
};

const highlight = (key: string) => {
  eventBus.emit("highlightField", key, true); // emit event to highlight
};

const handleToggleAccordion = (key: string, shouldOpen: boolean) => {
  if (shouldOpen) {
    if (!openPanels.value.includes(key)) {
      openPanels.value.push(key);
    }
  } else {
    openPanels.value = openPanels.value.filter((panel) => panel !== key);
  }
};

onMounted(() => {
  eventBus.on("toggleAccordion", handleToggleAccordion);
});

onUnmounted(() => {
  eventBus.off("toggleAccordion", handleToggleAccordion);
});

const headerNameMap = {
  version: "Version",
  hdr_len: "Header Length",
  dsfield: "Differentiated Services Field",
  len: "Length",
  id: "Identification",
  flags: "Flags",
  frag_offset: "Fragment Offset",
  ttl: "Time to Live",
  proto: "Protocol",
  checksum: "Header Checksum",
  src: "Source",
  dst: "Destination",
  srcport: "Source Port",
  dstport: "Destination Port",
  seq: "Sequence Number",
  ack: "Acknowledgment Number",
  hdrflags: "Header Flags",
  proto_len: "Protocol Length",
  protoname: "Protocol Name",
  ver: "Version",
  conflag_uname: "Connect Flag Username",
  conflag_passwd: "Connect Flag Password",
  conflag_retain: "Connect Flag Retain",
  conflag_qos: "Connect Flag QoS",
  conflag_willflag: "Connect Flag Will Flag",
  conflag_cleanness: "Connect Flag Clean Session",
  conflag_reserved: "Connect Flag Reserved",
  kalive: "Keep Alive",
  clientid_len: "Client ID Length",
  window_size_value: "Window Size Value",
  urgent_pointer: "Urgent Pointer",
  options: "Options",
  conack_flags: "Connect Acknowledge Flags",
  conack_val: "Connect Acknowledge Value",
  msgid: "Message ID",
  topic_len: "Topic Length",
  topic: "Topic",
  sub_qos: "Subscription QoS",
  suback_qos: "Subscription Acknowledge QoS",
  msg: "Message",
};

const getHeaderName = (key: string): string => {
  return headerNameMap[key] || key;
};
</script>

<style scoped>
.original-title {
  font-size: 0.8em;
  color: #fff;
  padding-left: 3px;
}
.raw-data {
  border-radius: 0;
  padding: 0px 3px;
}
.accordion-item {
  border-radius: 0;
  border: 0px;
}
.accordion-header {
  background: transparent;
  cursor: pointer;
  padding: 1px 1px 1px 3px;
  text-align: left;
  color: #2c3e50;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  border: 0px;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
}
.accordion-header:hover {
  background-color: #f0f0f0; /* Hover background color */
}
.accordion-header.active {
  background-color: #e0e0e0; /* Active (clicked) background color */
}
.accordion-header i {
  margin-right: 8px;
}
.accordion-content {
  padding: 5px 10px 5px 25px;
  background: transparent;
  border: 0px;
  color: #2c3e50;
  font-family: "Poppins", sans-serif;
}
.accordion-content > div:hover {
  background-color: #f0f0f0; /* Hover background color for content */
  cursor: pointer; /* Added cursor pointer to indicate clickable item */
}
.bold-text {
  font-weight: 500;
}
.accordion-header.active {
  font-weight: 600;
}
.medium-text {
  font-weight: 600;
}
</style>
