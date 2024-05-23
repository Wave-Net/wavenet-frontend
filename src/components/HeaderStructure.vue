<template>
  <div class="header">
    <!-- <img src="@/assets/wavenLo.png" alt="WaveNet Logo" class="logo" /> -->
    <img src="@/assets/wavenLogoVer2.png" alt="WaveNet Logo" class="logo" />

    <!-- 아래 nav는 나중에 삭제 할것 -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/capture-page">Capture</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  height: 50px;
}
.logo {
  width: 50px;
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
