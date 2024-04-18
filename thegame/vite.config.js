import basicSsl from '@vitejs/plugin-basic-ssl';
import {terser} from 'rollup-plugin-terser';
import {defineConfig} from 'vite';

export default ({command}) => ({
	root: 'src',
	publicDir: '../3d-assets',
	build: {
		outDir: '../../build',
		emptyOutDir: true,
		rollupOptions: {
			plugins: [terser({compress: {drop_console: true}})],
		},
	},
	plugins: process.env.USE_SSL === 'true' ? [basicSsl()] : [],
	base: '/',
});
