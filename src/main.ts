import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style.css';
import App from '@/App.vue';
import './permission';
import router from './router/index';
import { createPinia } from 'pinia';
const pinia = createPinia();
function initApp() {
	const app = createApp(App);
	app.use(pinia);
	app.use(router);
	app.use(Antd);
	app.mount('#app');
}
initApp();
