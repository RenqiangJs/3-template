import { createApp } from 'vue';

import 'ant-design-vue/dist/antd.css';
// 引入公共样式
import './assets/styles/index.scss';
import App from '@/App.vue';
import './permission';
import router from './router/index';
import { createPinia } from 'pinia';
import { registerGlobComp } from '@/components/registerGlobComp';
const pinia = createPinia();
function initApp() {
	const app = createApp(App);
	// 注册全局组件
	registerGlobComp(app);
	app.use(pinia);
	app.use(router);
	app.mount('#app');
}
initApp();
