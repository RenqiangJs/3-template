import Icon from './icon';
import type { App } from 'vue';
import formModel from '@/components/formModel/index.vue';
import tableModel from '@/components/tableModel/index.vue';
import Antd from 'ant-design-vue';
export function registerGlobComp(app: App) {
	// console.log(uploadImg, 'upload')
	app.use(Icon).use(Antd);
	app.component('formModel', formModel);
	app.component('tableModel', tableModel);
}
