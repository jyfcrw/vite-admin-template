import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

// Configuration: https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': pathResolve('src'),
      '@images': resolve('src/assets/images'),
      'vue': 'vue/dist/vue.esm-bundler.js',
    }
  },
  plugins: [
    vue(),
    svgLoader()
  ],
  server: {
    port: 8000,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  optimizeDeps: {
    include: [
      'lodash'
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `$injectedColor: orange;`
        additionalData: '@import "@/assets/styles/globalInjectedData.scss";'
      }
    }
  }
})
