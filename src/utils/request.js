import axios from 'axios';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { getToken } from './auth';
import errorCode from './errorCode';
import { tansParams } from '@/utils/index';
import { useToken } from '@/store/useUserInfo';
import { removeToken } from '@/utils/auth';
import { useRouter } from 'vue-router';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const router = useRouter();
// 创建axios实例
const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分
	baseURL: import.meta.env.VITE_BASE_API,
	// 超时
	timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
	config => {
		// 是否需要设置 token
		const isToken = (config.headers || {}).isToken === false;
		if (getToken() && !isToken) {
			config.headers['Authorization'] = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
		}
		// get请求映射params参数
		if (config.method === 'get' && config.params) {
			let url = config.url + '?' + tansParams(config.params);
			url = url.slice(0, -1);
			config.params = {};
			console.log(config, 'config');

			config.url = url;
		}
		return config;
	},
	error => {
		console.log(error);
		Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	res => {
		const tokenStore = useToken();
		// 未设置状态码则默认成功状态
		const code = res.data.code || 200;
		// 获取错误信息
		const msg = errorCode[code] || res.data.msg || errorCode['default'];
		if (code === 401) {
			Modal.confirm({
				title: '系统提示',
				icon: createVNode(ExclamationCircleOutlined),
				content: createVNode('div', { style: 'color:red;' }, '登录状态已过期，您可以继续留在该页面，或者重新登录'),
				onOk() {
					console.log('重新登陆');
					tokenStore.clearToken();
					removeToken();
					router.push({ path: '/login' });
				},
				onCancel() {},
				class: 'test',
			});
			return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
		} else if (code === 500) {
			message.error(msg);
			return Promise.reject(new Error(msg));
		} else if (code !== 200) {
			message.error(msg);
			return Promise.reject('error');
		} else {
			return Promise.resolve(res.data);
		}
	},
	error => {
		console.log('err' + error);
		let { errMessage } = error;
		if (errMessage == 'Network Error') {
			errMessage = '后端接口连接异常';
		} else if (errMessage.includes('timeout')) {
			errMessage = '系统接口请求超时';
		} else if (errMessage.includes('Request failed with status code')) {
			errMessage = '系统接口' + errMessage.substr(errMessage.length - 3) + '异常';
		}
		message.error(errMessage, 3);
		return Promise.reject(error);
	}
);

// 通用下载方法
export function download(url, params, filename) {
	return service
		.post(url, params, {
			transformRequest: [
				params => {
					return tansParams(params);
				},
			],
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			responseType: 'blob',
		})
		.then(data => {
			const content = data;
			const blob = new Blob([content]);
			if ('download' in document.createElement('a')) {
				const elink = document.createElement('a');
				elink.download = filename;
				elink.style.display = 'none';
				elink.href = URL.createObjectURL(blob);
				document.body.appendChild(elink);
				elink.click();
				URL.revokeObjectURL(elink.href);
				document.body.removeChild(elink);
			} else {
				navigator.msSaveBlob(blob, filename);
			}
		})
		.catch(r => {
			console.error(r);
		});
}

export default service;
