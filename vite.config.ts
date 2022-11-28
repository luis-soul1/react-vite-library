import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig /* , loadEnv */ } from 'vite'
import dts from 'vite-plugin-dts'
import EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'

const { EsLinter, linterPlugin } = EsLint
import * as packageJson from './package.json'

export default defineConfig((configEnv) => {
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),
      tsConfigPaths(),
      linterPlugin({
        include: ['./src}/**/*.{ts,tsx}'],
        linters: [new EsLinter({ configEnv })]
      }),
      dts({
        include: ['src/components/']
      })
    ],
    build: {
      minify: false,
      lib: {
        entry: resolve('src', 'components/index.ts'),
        name: 'ReactViteLibrary',
        formats: ['es', 'umd'],
        fileName: (format) => `react-vite-library.${format}.js`
      },
      rollupOptions: {
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            '@emotion/styled': 'styled',
            '@emotion/react': 'React',
            '@mui/material': 'MaterialUI',
            'react-iconly': 'Iconly'
          }
        },
        external: [...Object.keys(packageJson.peerDependencies)]
      }
    }
  }
})
