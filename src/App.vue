<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useWebSocketStore } from "@/stores";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const websocketStore = useWebSocketStore();

onMounted(() => {
  websocketStore.connect("ws://localhost:8000/ws");
  
});

onUnmounted(() => {
  websocketStore.disconnect();
});
</script>

<style lang="scss">
@import '@/assets/sass/wavenet.scss';
</style>
