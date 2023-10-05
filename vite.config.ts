import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname,'src/components'),
      '@context': path.resolve(__dirname,'src/context'),
      '@hooks': path.resolve(__dirname,'src/hooks'),
      '@icons': path.resolve(__dirname,'src/assets/icons'),
      '@images': path.resolve(__dirname,'src/assets/images'),
      '@styles': path.resolve(__dirname,'src/assets/styles'),
      '@types': path.resolve(__dirname,'src/types'),
      '@utils': path.resolve(__dirname,'src/utils'),
    }
  },
})
