import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router';


import PrimeVue from 'primevue/config'; // PrimeVue import 추가
import 'primevue/resources/themes/saga-blue/theme.css'; // 테마
import 'primevue/resources/primevue.min.css'; // 핵심 CSS
import 'primeicons/primeicons.css'; // 아이콘


const pinia = createPinia();

createApp(App)
    .use(PrimeVue)
    .use(pinia)
    .use(router)
    .mount('#app')
