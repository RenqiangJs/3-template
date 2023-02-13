import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import './permission'
import router from './router/index'
function initApp() {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}
initApp()
