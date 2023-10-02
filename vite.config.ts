import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': '/src/assets/styles',
      '@images': '/src/assets/images',
      '@icons': '/src/assets/icons',
      '@components': '/src/components',
      '@context': '/src/context',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
    }
  },
})
