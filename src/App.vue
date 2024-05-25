<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useWebSocketStore } from "@/store";

const websocketStore = useWebSocketStore();

onMounted(() => {
  websocketStore.connect("ws://localhost:8000/ws");
});

onUnmounted(() => {
  websocketStore.disconnect();
});
</script>
