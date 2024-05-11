<template>
  <router-view />
  <!--2페이지로 넘어갈때 /capture-page 추가하기--> 
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
