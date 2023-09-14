import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import toastservice from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';


const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(toastservice)
app.directive('tooltip', Tooltip);

app.mount('#app')
