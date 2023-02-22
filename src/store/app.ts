import { defineStore } from 'pinia';
import { ref } from 'vue';

export const appSetting = defineStore('appSettingStore', () => {
	let collapsed = ref<boolean>(true);
	const setCollapsed = function (val: boolean) {
		console.log(val, 7);

		collapsed.value = val;
	};
	const getCollapsed = function (tokenData: string) {
		return collapsed;
	};
	return {
		collapsed,
		setCollapsed,
		getCollapsed,
	};
});
