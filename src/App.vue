<template>
  <router-view />
</template>

<script>
import { createApp } from 'vue';
import router from './router';

export default {
  name: 'App',
  setup() {
    const app = createApp({});
    app.use(router);
    return { app };
  },
};
</script>
