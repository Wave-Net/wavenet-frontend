<template>
  <TheHeader />
  <main class="content">
    <Splitter id="splitter-1" style="width: 100%; height: 640px">
      <SplitterPanel id="splitter-1-panel-1" class="panel-1" :size="15">
        <!-- Panel 1 -->
        <div class="row mt-1 mb-2">
          <MenuButton />
        </div>
        <div class="row">
          <div class="col-12">
            graph
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            number
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
            >
              <SplitterPanel id="splitter-3-panel-1" :size="70">
                <!-- Panel 2 -->
                <PacketTable @row-click="onRowClick" />
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
import { TheHeader, TheFooter, PacketTable, MenuButton } from "@/components";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";

import { onMounted, onUnmounted } from "vue";
import { useCaptureStore } from "@/stores";

const captureStore = useCaptureStore();
onMounted(() => {
  captureStore.connect();
});

onUnmounted(() => {
  captureStore.disconnect();
});

const onRowClick = (event: any) => {
  console.log(event.data)
};
</script>

<style scoped>
.panel-1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
