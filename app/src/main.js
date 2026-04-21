import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './tailwind.css' 
import router from './router/router'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia).mount('#app')