import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig /* , loadEnv */ } from 'vite'
import dts from 'vite-plugin-dts'
import EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'

const { EsLinter, linterPlugin } = EsLint
import * as packageJson from './package.json'

export default defineConfig((configEnv) => {
  // process.env = Object.assign(process.env, loadEnv(configEnv.mode, process.cwd(), ''))

  return {
    plugins: [
      react({ jsxRuntime: 'classic' }),
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
      lib: {
        entry: resolve('src', 'components/index.ts'),
        name: 'ReactViteLibrary',
        formats: ['es', 'umd'],
        fileName: (format) => `react-vite-library.${format}.js`
      },
      rollupOptions: {
        external: [...Object.keys(packageJson.peerDependencies)]
      }
    }
  }
})
