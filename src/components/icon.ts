import { App, createVNode } from 'vue';
import * as $Icon from '@ant-design/icons-vue';
const Icon = (props: { icon: string }) => {
	const { icon } = props;
	// @ts-ignore
	return createVNode($Icon[icon]);
};
export default {
	install(app: App) {
		app.component('icon', Icon);
	},
};
