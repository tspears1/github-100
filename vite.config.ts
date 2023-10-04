import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@context': '/src/context',
      '@hooks': '/src/hooks',
      '@icons': '/src/assets/icons',
      '@images': '/src/assets/images',
      '@styles': '/src/assets/styles',
      '@types': '/src/types',
      '@utils': '/src/utils',
    }
  },
})
