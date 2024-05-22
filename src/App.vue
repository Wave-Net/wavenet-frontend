<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/capture-page">Capture</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useWebSocketStore } from "./store/websocketStore";

const websocketStore = useWebSocketStore();

onMounted(() => {
  websocketStore.connect("ws://localhost:8000/ws");
});

onUnmounted(() => {
  websocketStore.disconnect();
});

</script>
