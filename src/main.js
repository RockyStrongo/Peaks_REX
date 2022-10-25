import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.scss'

//router library configured in /router/index.js
import router from './router'

// mitt library used for Event Bus 
import mitt from 'mitt'

const emitter = mitt();

const app = createApp(App)

app.use(router)

app.config.globalProperties.emitter = emitter;

app.mount('#app');