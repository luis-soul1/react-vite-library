import { resolve } from 'path'

import modulesResolver from '@rollup/plugin-node-resolve'
import react from '@vitejs/plugin-react'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { defineConfig, loadEnv } from 'vite'
import dts from 'vite-plugin-dts'
import EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'

const { EsLinter, linterPlugin } = EsLint
import * as packageJson from './package.json'

export default defineConfig((configEnv) => {
  const intitializeEnvKeys = () => {
    try {
      const env = loadEnv(configEnv.mode, process.cwd())
      return env
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return {
    plugins: [
      react({ jsxRuntime: 'classic' }),
      tsConfigPaths(),
      linterPlugin({
        include: ['./src/**/*.{ts,tsx}'],
        linters: [new EsLinter({ configEnv })]
      }),
      dts({
        include: ['src/components/']
      }),
      peerDepsExternal(),
      injectProcessEnv(intitializeEnvKeys()),
      modulesResolver()
    ],
    build: {
      lib: {
        entry: resolve('src', 'components/index.ts'),
        name: 'ReactViteLibrary',
        formats: ['es', 'umd'],
        fileName: (format) => `react-vite-library.${format}.js`
      },
      rollupOptions: {
        external: [
          ...Object.keys(packageJson.peerDependencies),
          '@emotion/react',
          '@emotion/styled',
          '@mui/icons-material',
          '@mui/lab',
          '@mui/material',
          '@mui/x-date-pickers',
          'react',
          'react-dom'
        ]
      }
    }
  }
})
