import basicSsl from '@vitejs/plugin-basic-ssl';
import {terser} from 'rollup-plugin-terser';
import {defineConfig} from 'vite';

export default ({command}) => ({
	root: 'three-dev',
	publicDir: '../3d-assets',
	build: {
		outDir: '../../webBuild5',
		emptyOutDir: true,
		rollupOptions: {
			plugins: [terser({compress: {drop_console: true}})],
		},
	},
	plugins: process.env.USE_SSL === 'true' ? [basicSsl()] : [],
	base: command === 'serve' ? '/' : '/3DModelingAndMRApps/webBuild5/',
});
