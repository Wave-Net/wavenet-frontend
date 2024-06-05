<template>
  <div class="accordion">
    <div
      v-for="(item, index) in accordionItems"
      :key="item.id"
      class="accordion-item"
    >
      <div class="accordion-header" @click="toggle(index)">
        {{ item.title }}
      </div>
      <div v-if="item.isOpen" class="accordion-content">
        <ContentComponent :fields="item.data" />
      </div>
    </div>
  </div>
</template>

<script>
import ContentComponent from "./protocol/ContentComponent.vue";

export default {
  components: {
    ContentComponent,
  },
  props: {
    pkt: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      accordionItems: [],
      previousPkt: null,
    };
  },
  created() {
    this.setAccordionItems();
  },
  watch: {
    pkt: {
      deep: true,
      handler(newPkt) {
        if (JSON.stringify(newPkt) !== JSON.stringify(this.previousPkt)) {
          this.previousPkt = JSON.parse(JSON.stringify(newPkt));
          this.setAccordionItems();
        }
      },
    },
  },
  methods: {
    setAccordionItems() {
      const existingItems = this.accordionItems.reduce((acc, item) => {
        acc[item.title] = item;
        return acc;
      }, {});

      this.accordionItems = Object.entries(this.pkt.layers).map(
        ([key, value]) => {
          let title = "";
          switch (key) {
            case "ETH":
              title = "Ethernet";
              break;
            case "IP":
              title = "Internet Protocol Version 4";
              break;
            case "TCP":
              title = "Transmission Control Protocol";
              break;
            case "UDP":
              title = "User Datagram Protocol";
              break;
            case "MQTT":
              title = "MQ Telemetry TransPort";
              break;
            case "COAP":
              title = "Constrained Application Protocol";
              break;
            default:
              title = key;
              break;
          }

          return {
            id: existingItems[title]?.id || this.accordionItems.length,
            title,
            data: value,
            isOpen: existingItems[title]?.isOpen || false,
          };
        }
      );
    },
    toggle(index) {
      this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
    },
  },
};
</script>

<style>
.accordion {
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.accordion-header {
  padding: 10px;
  cursor: pointer;
  background-color: #7bc2d0;
  color: #fff;
  font-family: "Poppins", sans-serif;
  border-radius: 5px;
  border: 1px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: background-color 0.3s ease;
  text-align: center;
}

.accordion-header:hover {
  background-color: #7bc2d099;
}

.accordion-content {
  padding: 5px 10px 10px 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
  margin-bottom: 5px;
}
</style>
