<template>
  <router-view />
  <!-- <div id="app-wavenet" class="app-wavenet">
    <header>
      헤더 컴포넌트
      <div class="logo-container">
        <img src="@/assets/wavenLo.png" alt="WaveNet Logo" class="logo" />
        <img src="@/assets/wavenLogoVer2.png" alt="WaveNet Logo" class="logo" />
      </div>
      아래 nav는 나중에 삭제 할것
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/capture-page">Capture</router-link>
      </div>
    </header>

    <main>
      라우터 뷰
      <router-view />
    </main>

    
  </div> -->
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
