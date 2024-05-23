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

<style scoped>
.app-wavenet {
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  height: 100%;
}
header {
  display: flex;
  flex-direction: row;
  height: 50px;
}
main {
  flex: 1;
}
footer {
  height: 21.6px;
}
.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.logo {
  width: 50px;
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
