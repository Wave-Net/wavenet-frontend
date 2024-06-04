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
        <div>
          <!-- {{ item.content }} -->
        </div>
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
  },
  data() {
    return {
      accordionItems: [],
    };
  },
  created() {
    this.setAccordionItems();
  },
  watch: {
    pkt: {
      deep: true,
      handler() {
        this.setAccordionItems();
      },
    },
  },
  methods: {
    setAccordionItems() {
      let idCounter = 0;
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
            case "CoAP":
              title = "Constrained Application Protocol";
              break;
            default:
              title = key;
              break;
          }

          return {
            id: idCounter++, // 동적으로 ID 추가
            title,
            content: `Content for ${title}: ${value.details}`,
            isOpen: false,
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
  width: 100%; /* 지정한 너비 */
  height: auto; /* 자동 높이 조정 */
  border: 1px solid #ddd;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.accordion-header {
  padding: 1px; /* 더 넉넉한 패딩 */
  cursor: pointer;
  background-color: #7bc2d0; /* 더 선명한 색상 */
  color: #fff;
  font-family: "Poppins", sans-serif;
  border-radius: 5px;
  border: 1px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: background-color 0.3s ease; /* 부드러운 배경색 전환 */
  text-align: center;
}

.accordion-header:hover {
  background-color: #7bc2d099; /* 호버 시 더 짙은 색상 */
}

.accordion-content {
  padding: 5px 10px 10px 10px;
  background-color: #fff;
  border: 1px solid #ddd; /* 내용 부분에도 테두리 추가 */
  border-radius: 5px; /* 내용 부분 테두리 반경 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 내용 부분 그림자 */
  font-family: "Poppins", sans-serif; /* 동일한 폰트 */
  margin-bottom: 5px; /* 더 넉넉한 여백 */
}
</style>
