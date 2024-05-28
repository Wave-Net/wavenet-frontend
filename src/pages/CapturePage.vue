<template>
  <TheHeader />
  <div>
    hi
  </div>
  <TheFooter />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { TheHeader, TheFooter } from "@/components"
import { useCaptureStore } from "@/stores"

const captureStore = useCaptureStore();

onMounted(() => {
  captureStore.connect();
  
});

onUnmounted(() => {
  captureStore.disconnect();
});
</script>

<style scoped></style>
