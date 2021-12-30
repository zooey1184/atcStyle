/** @format */

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// @ts-ignore
const PACKAGE = require('./package.json')

// 自定义组件 web component 前缀
export const CUSTOM_ELEMENT_PREFIX = 'imc-'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes(CUSTOM_ELEMENT_PREFIX),
        },
      },
    }),
    eslintPlugin(),
    vueJsx(),
  ],
  resolve: {
    alias: [
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js',
      },
    ],
  },
  server: {
    open: './index.html',
  },
  build: {
    manifest: true,
    rollupOptions: {
      // 外部依赖
      external: ['vue'],
      output: {
        // 全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
    outDir: path.resolve(__dirname, `dist/${PACKAGE.version}`),
    lib: {
      entry: path.resolve(__dirname, 'lib/index.less'),
      name: PACKAGE.name,
    },
  },
})
