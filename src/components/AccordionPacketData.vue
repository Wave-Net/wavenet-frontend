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
        <component :is="component" :fields="item.data" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pkt: {
      type: Object,
      required: true,
    },
    component: {
      type: String,
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
        ([key, value], index) => {
          let title = "";
          if (key === "ETH") {
            title = "Ethernet";
          } else if (key === "IP") {
            title = "Internet Protocol Version 4";
          } else if (key === "TCP") {
            title = "Transmission Control Protocol";
          } else if (key === "UDP") {
            title = "User Datagram Protocol";
          } else if (key.startsWith("MQTT")) {
            title = `MQ Telemetry TransPort (${key.substring(4)})`;
          } else if (key === "COAP") {
            title = "Constrained Application Protocol";
          } else {
            title = key;
          }

          return {
            id: `${key}-${index}`,
            title,
            data: value,
            isOpen: existingItems[title]?.isOpen || false,
          };
        }
      );

      // Log each id to the console
      this.accordionItems.forEach((item) => {
        console.log(`ID: ${item.id}`);
      });
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
  padding: 1px;
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
  /* padding: 5px; */
  background-color: #fff;
  border: 1px solid #ddd;
  border-top: none;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
