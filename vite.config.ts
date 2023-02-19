import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	return {
		plugins: [vue()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
			extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
		},
		server: {
			port: 4001,
			proxy: {
				'/api': {
					target: `http://vue.ruoyi.vip`,
					changeOrigin: true,
					rewrite: p => p.replace(/^\/api/, ''),
				},
			},
		},
	};
});
