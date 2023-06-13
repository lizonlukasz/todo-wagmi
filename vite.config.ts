import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'abis', replacement: path.resolve(__dirname, 'src/abis') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'contexts', replacement: path.resolve(__dirname, 'src/contexts') },
      { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: 'styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: 'types', replacement: path.resolve(__dirname, 'src/types') },
      { find: 'views', replacement: path.resolve(__dirname, 'src/views') },
    ],
  },
  server: {
    open: true,
    port: 4040
  }
})
