<template>
  <TheHeader />
  <main class="content">
    <Splitter id="splitter-1" style="width: 100%; height: 640px">
      <SplitterPanel id="splitter-1-panel-1" class="panel-1 p-1" :size="15">
        <div class="row mt-1 mb-2">
          <MenuButton />
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <PacketGraph />
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel id="splitter-1-panel-2" :size="85">
        <Splitter id="splitter-2" style="width: 100%; height: 100%">
          <SplitterPanel id="splitter-2-panel-1" :size="80">
            <Splitter
              id="splitter-3"
              style="width: 100%; height: 100%"
              layout="vertical"
              @resize="updatePacketTableHeight"
            >
              <SplitterPanel id="splitter-3-panel-1" :size="70">
                <PacketTable
                  :scrollableHeight="packetTableHeight"
                  @row-click="onRowClick"
                />
              </SplitterPanel>
              <SplitterPanel id="splitter-3-panel-2" :size="30">
                <Splitter id="splitter-4" style="width: 100%; height: 100%">
                  <SplitterPanel id="splitter-4-panel-1">
                    Panel 3
                  </SplitterPanel>
                  <SplitterPanel id="splitter-4-panel-2">
                    Panel 4
                  </SplitterPanel>
                </Splitter>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
          <SplitterPanel id="splitter-2-panel-2" :size="20">
            Panel 5
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
} from "@/components";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import { onMounted, onUnmounted, ref } from "vue";
import { useCaptureStore } from "@/stores";

const captureStore = useCaptureStore();
const packetTableHeight = ref("70%");

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

const onRowClick = (event: any) => {
  console.log(event.data);
};
</script>

<style scoped>
.panel-1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
