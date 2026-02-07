import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'library') {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'DarkBlue',
          formats: ['es'],
          fileName: 'index',
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            banner: '"use client";',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        copyPublicDir: false,
      },
    }
  }

  return {
    plugins: [react()],
  }
})
