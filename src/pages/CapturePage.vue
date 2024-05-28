<template>
  <TheHeader />
  <main class="content">
    <Splitter style="width: 100%; height: 100%">
      <SplitterPanel class="flex align-items-center justify-content-center" :size="15">
        Panel 1
      </SplitterPanel>
      <SplitterPanel class="flex align-items-center justify-content-center" :size="85">
        <Splitter style="width: 100%; height: 100%">
          <SplitterPanel class="flex align-items-center justify-content-center" :size="80">
            <Splitter style="width: 100%; height: 100%" layout="vertical">
              <SplitterPanel
                class="flex align-items-center justify-content-center" :size="70"
              >
                Panel 2
              </SplitterPanel>
              <SplitterPanel
                class="flex align-items-center justify-content-center" :size="30"
              >
                <Splitter style="width: 100%; height: 100%">
                  <SplitterPanel
                    class="flex align-items-center justify-content-center"
                  >
                    Panel 3
                  </SplitterPanel>
                  <SplitterPanel
                    class="flex align-items-center justify-content-center"
                  >
                    Panel 4
                  </SplitterPanel>
                </Splitter>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
          <SplitterPanel class="flex align-items-center justify-content-center" :size="20">
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
</script>

<style scoped></style>
