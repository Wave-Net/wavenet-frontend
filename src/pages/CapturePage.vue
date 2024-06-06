<template>
  <TheHeader />
  <main class="content">
    <Splitter id="splitter-1" style="width: 100%; height: 640px">
      <SplitterPanel id="splitter-1-panel-1" class="panel-1 p-1" :size="15">
        <div class="row mt-1 mb-2">
          <MenuButton :device-ip="deviceIp" />
        </div>
        <div class="row mt-2">
          <PacketGraph />
        </div>
      </SplitterPanel>
      <SplitterPanel id="splitter-1-panel-2" :size="85">
        <Splitter id="splitter-2" style="width: 100%; height: 100%">
          <SplitterPanel id="splitter-2-panel-1" :size="70">
            <Splitter
              id="splitter-3"
              style="width: 100%; height: 100%"
              layout="vertical"
              @resize="updatePacketTableHeight"
            >
              <SplitterPanel id="splitter-3-panel-1" :size="50">
                <PacketTable
                  :scrollable-height="packetTableHeight"
                  @row-click="onRowClick"
                  :highlightedIndex="highlightedIndex"
                  :highlightedFlowchartIndex="highlightedFlowchartIndex"
                />
              </SplitterPanel>
              <SplitterPanel id="splitter-3-panel-2" :size="50">
                <Splitter id="splitter-4" style="width: 100%; height: 100%">
                  <SplitterPanel
                    id="splitter-4-panel-1"
                    style="height: 100%; overflow-y: auto"
                  >
                    <AccordionPacketData
                      v-if="clickPacket"
                      :pkt="clickPacket"
                      :component="DiagramStructure"
                    />
                  </SplitterPanel>
                  <SplitterPanel
                    id="splitter-4-panel-2"
                    style="height: 100%; overflow-y: auto"
                  >
                    <AccordionPacketData
                      v-if="clickPacket"
                      :pkt="clickPacket"
                      :component="RawData"
                    />
                  </SplitterPanel>
                </Splitter>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
          <SplitterPanel
            id="splitter-2-panel-2"
            :size="20"
            style="height: 100%; overflow-y: auto"
          >
            <PacketFlowChart
              :flowchart_packets="flowchartPacket"
              :sourceIP="sourceIP"
              :destinationIP="destinationIP"
              @packetIndexSelected="handlePacketHighlight"
              :highlightedIndex="highlightedFlowchartIndex"
            />
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import {
  TheHeader,
  TheFooter,
  PacketTable,
  MenuButton,
  PacketGraph,
  PacketFlowChart,
  DiagramStructure,
  RawData,
  AccordionPacketData,
} from "@/components";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import { onMounted, onUnmounted, ref } from "vue";
import { useCaptureStore } from "@/stores";
import { useRoute } from "vue-router";

const captureStore = useCaptureStore();
const packetTableHeight = ref("70%");
const route = useRoute();
const deviceIp = ref((route.query.device_ip as string) || "");

onMounted(() => {
  captureStore.connect();
  updatePacketTableHeight();
  window.addEventListener("resize", updatePacketTableHeight);
});

onUnmounted(() => {
  captureStore.disconnect();
  window.removeEventListener("resize", updatePacketTableHeight);
});

const updatePacketTableHeight = () => {
  const panelHeight =
    document.getElementById("splitter-3-panel-1")?.offsetHeight;
  if (panelHeight) {
    packetTableHeight.value = `${panelHeight}px`;
  }
};

const clickPacket = ref(null);
const sourceIP = ref<string | null>(null);
const destinationIP = ref<string | null>(null);
const flowchartPacket = ref([]);
const highlightedIndex = ref<number | null>(null);
const highlightedFlowchartIndex = ref<number | null>(null);

const onRowClick = (event: any) => {
  console.log("CLICK !! : ", event.data);
  clickPacket.value = event.data;

  sourceIP.value = event.data.layers.IP.src.value;
  destinationIP.value = event.data.layers.IP.dst.value;
  flowchartPacket.value = captureStore.packetMessages; // 웹소켓 스토어에서 메세지 배열을 저장
  console.log("FLOWCHART PACKET :", flowchartPacket);

  // 클릭된 행이 이미 하이라이트된 행인지 확인
  if (highlightedIndex.value === event.data.info.index) {
    highlightedIndex.value = null; // 하이라이트 해제
    highlightedFlowchartIndex.value = null; // flowchart 하이라이트 해제
  } else {
    highlightedIndex.value = event.data.info.index; // 새로운 하이라이트 설정
    highlightedFlowchartIndex.value = event.data.info.index; // flowchart 하이라이트 설정
  }
};

const handlePacketHighlight = (index: number) => {
  if (highlightedIndex.value === index) {
    highlightedIndex.value = null; // 하이라이트 해제
    highlightedFlowchartIndex.value = null; // flowchart 하이라이트 해제
  } else {
    highlightedIndex.value = index; // 새로운 하이라이트 설정
    highlightedFlowchartIndex.value = index; // flowchart 하이라이트 설정
  }
  // console.log("INDEX", index);
};
</script>

<style scoped>
.panel-1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
