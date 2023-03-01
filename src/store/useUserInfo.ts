import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { isEmpty } from '@/utils/index';
import Layout from '@/layout/index.vue';
import { getUserInfo, getRouters } from '@/api';
import ParentView from '@/components/ParentView/index.vue';
const modules = import.meta.glob('./../views/**/*.vue');
export const useUserInfo = defineStore('userInfoStore', () => {
	let userInfo = reactive({});
	let userMenus = reactive({});
});
export const useToken = defineStore('tokenStore', () => {
	let token = ref('');
	let routes = ref([]);
	let roles = ref([]);
	const setToken = function (tokenData: string) {
		token.value = tokenData;
	};

	const getToken = function (): string {
		return token.value;
	};

	const clearToken = function () {
		token.value = '';
	};
	const setRoutes = function () {
		getRouters().then(res => {
			const sdata = JSON.parse(JSON.stringify(res.data));
			routes.value = filterAsyncRouter(sdata);
		});
	};
	const getRoutes = function (routeData) {
		return routes.value;
	};
	const setRoles = function () {
		getUserInfo().then(res => {
			if (res.roles && res.roles.length > 0) {
				// 验证返回的roles是否是一个非空数组
				roles.value = res.roles;
			} else {
				roles.value = ['ROLE_DEFAULT'];
			}
		});
	};
	return {
		token,
		setToken,
		getToken,
		clearToken,
		setRoutes,
		getRoutes,
		routes,
		setRoles,
		roles,
	};
});
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
	return asyncRouterMap.filter(route => {
		if (type && route.children) {
			route.children = filterChildren(route.children);
		}
		if (route.component) {
			// Layout ParentView 组件特殊处理
			if (route.component === 'Layout') {
				route.component = Layout;
			} else if (route.component === 'ParentView') {
				route.component = ParentView;
				// } else if (route.component === 'InnerLink') {
				//   route.component = InnerLink
			} else {
				route.component = loadView(route.component);
			}
		}
		if (route.children != null && route.children && route.children.length) {
			route.children = filterAsyncRouter(route.children, route, type);
		} else {
			delete route['children'];
			delete route['redirect'];
		}
		return true;
	});
}
function filterChildren(childrenMap, lastRouter = false) {
	var children = [];
	childrenMap.forEach((el, index) => {
		if (el.children && el.children.length) {
			if (el.component === 'ParentView') {
				el.children.forEach(c => {
					c.path = el.path + '/' + c.path;
					if (c.children && c.children.length) {
						children = children.concat(filterChildren(c.children, c));
						return;
					}
					children.push(c);
				});
				return;
			}
		}
		if (lastRouter) {
			el.path = lastRouter.path + '/' + el.path;
		}
		children = children.concat(el);
	});
	return children;
}
export const loadView = view => {
	for (const path in modules) {
		const dir = path.split('views/')[1].split('.vue')[0];
		if (dir === view) {
		}
	}
};
