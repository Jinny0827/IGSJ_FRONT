import { createApp } from 'vue'
import App from './EntrancePage.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import mitt from './mitt'
import mixins from './mixins'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$serverUrl = 'http://localhost:8086'
app.use(store).use(router).use(mitt).mixin(mixins).mount('#app')

window.Kakao.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
window.console.log('kakao : '+Kakao.isInitialized())
