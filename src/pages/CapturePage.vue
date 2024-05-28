<template>
  <TheHeader />
  <main class="content">
    <Splitter id="splitter-1" style="width: 100%; height: 640px;">
      <SplitterPanel id="splitter-1-panel-1" class="flex align-items-center justify-content-center p-1" :size="15">
        Panel 1
      </SplitterPanel>
      <!-- 중간 패널 (수직 Splitter 포함) -->
      <SplitterPanel id="splitter-1-panel-2" class="flex align-items-center justify-content-center" :size="85">
        <Splitter id="splitter-2" style="width: 100%; height: 100%">
          <SplitterPanel id="splitter-2-panel-1" class="flex align-items-center justify-content-center" :size="80">
            <Splitter id="splitter-3" style="width: 100%; height: 100%" layout="vertical">
              <SplitterPanel id="splitter-3-panel-1" class="flex align-items-center justify-content-center" :size="70">
                <!-- Panel 2 -->
                <DataTable :value="packetMessages" removableSort scrollable rowHover>
                  <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"
                    :style="col.style" :sortable="col.sortable">
                  </Column>
                </DataTable>
              </SplitterPanel>
              <!-- 하단 패널 (수평 Splitter 포함) -->
              <SplitterPanel id="splitter-3-panel-2" class="flex align-items-center justify-content-center" :size="30">
                <Splitter id="splitter-4" style="width: 100%; height: 100%">
                  <SplitterPanel id="splitter-4-panel-1" class="flex align-items-center justify-content-center">
                    Panel 3
                  </SplitterPanel>
                  <SplitterPanel id="splitter-4-panel-2" class="flex align-items-center justify-content-center">
                    Panel 4
                  </SplitterPanel>
                </Splitter>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
          <SplitterPanel id="splitter-2-panel-2" class="flex align-items-center justify-content-center" :size="20">
            Panel 5
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { TheHeader, TheFooter } from "@/components";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { onMounted, onUnmounted, computed } from "vue";
import { useCaptureStore } from "@/stores"

const captureStore = useCaptureStore();
const packetMessages = computed(() => captureStore.packetMessages);

onMounted(() => {
  captureStore.connect();
});

onUnmounted(() => {
  captureStore.disconnect();
});

const columns = [
  { field: "index", header: "#", style: { width: "10px" }, sortable: true },
  { field: "seconds_since_beginning", header: "Time" },
  { field: "src", header: "Src" },
  { field: "dst", header: "Dst" },
  { field: "layer", header: "Protocol" },
  { field: "length", header: "Len", sortable: true },
  { field: "type", header: "Info" },
];
</script>

<style scoped></style>
