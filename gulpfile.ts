import ts from 'gulp-typescript'
import path from 'path'
import { src, dest, series, parallel } from 'gulp'
import { run, withTaskName } from './build/utils'
import {
  distPath,
  pkgDistPath,
  projectRoot,
  srcPath
} from './build/utils/paths'
import rename from 'gulp-rename'
import { rollup, OutputOptions, ModuleFormat } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

const buildPackages = async () => {
  const plugins = [nodeResolve(), commonjs(), typescript()]
  const inputOptions = {
    input: path.resolve(srcPath, 'index.ts'),
    plugins
  }
  const outputOptions: OutputOptions[] = [
    {
      format: 'umd',
      file: path.resolve(pkgDistPath, 'index.js'),
      name: 'WebsocketClient',
      exports: 'named'
    },
    {
      format: 'esm',
      file: path.resolve(pkgDistPath, 'index.esm.js')
    }
  ]
  // create a bundle
  const bundle = await rollup(inputOptions)

  return Promise.all(outputOptions.map((option) => bundle.write(option)))
}

const buildModule = () => {
  const buildConfig = {
    esm: {
      module: 'ESNext',
      output: 'es'
    },
    cjs: {
      module: 'CommonJS',
      output: 'lib'
    }
  }
  const tsConfig = path.resolve(projectRoot, 'tsconfig.json')
  return Object.values(buildConfig).map((config) => {
    const outputName = config.output
    const outputDir = path.resolve(distPath, outputName)
    return withTaskName(`build::${outputName}`, async () => {
      const inputs = ['src/**/*.ts']
      const tsProject = ts.createProject(tsConfig, {
        module: config.module,
        declaration: true,
        moduleResolution: 'node',
        strict: false
      })
      src(inputs).pipe(tsProject()).pipe(dest(outputDir))
    })
  })
}

const copyWebsocketClientFiles = async () => {
  const inputs = ['CHANGELOG.md', 'README.md']
  src(inputs).pipe(dest(distPath))
  src('build/pkg.json').pipe(rename('package.json')).pipe(dest(distPath))
}

export default series(
  withTaskName('clean', () => run('rm -rf dist')),
  parallel(
    withTaskName('build:umd&esm', buildPackages),
    ...buildModule(),
    withTaskName(`copy-files`, copyWebsocketClientFiles)
  )
)
