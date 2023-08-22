import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import Toaster from '@meforma/vue-toaster';
import './axios'
createApp(App).use(bootstrap).use(router).use(Toaster).mount('#app')
