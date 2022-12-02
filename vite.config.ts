import { dirname, resolve /* , relative, join  */ } from 'path'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react'
import glob from 'glob'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'

import pkg from './package.json'

const { EsLinter, linterPlugin } = EsLint
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const makeExternalPredicate = (externalArr: string[]) => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return (id: string) => pattern.test(id)
}

const externals = makeExternalPredicate(Object.keys(pkg.peerDependencies))

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
        include: ['./src/**/*.{ts,tsx}'],
        linters: [new EsLinter({ configEnv })]
      }),
      dts({
        include: ['src/'],
        compilerOptions: { jsxImportSource: '@emotion/react' }
      })
    ],
    build: {
      // minify: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'PdvUikit',
        formats: ['es'],
        fileName: 'index'
      },
      rollupOptions: {
        external: externals,
        input: glob.sync(resolve(__dirname, 'src/**/*.ts')),
        plugins: []
        // output: {
        //   preserveModules: true,
        //   entryFileNames: (entry) => {
        //     const { name, facadeModuleId } = entry
        //     console.log({ entry })

        //     const fileName = `${name}.js`
        //     if (!facadeModuleId || facadeModuleId.includes('node_modules')) {
        //       return fileName
        //     }
        //     const relativeDir = relative(resolve(__dirname, 'src'), dirname(facadeModuleId))
        //     return join(relativeDir, fileName)
        //   }
        // }
      }
    }
  }
})
