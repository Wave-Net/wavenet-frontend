<template>
  <TheHeader />
  <main>
    <div class="row-lg-1">
      <div class="col-lg-1">
        섹션 1
      </div>
    </div>
    <div class="row-lg-3">
      <div class="col-lg-1">
        섹션 2
      </div>
    </div>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { TheHeader, TheFooter } from "@/components";
</script>

<style scoped>
</style>
