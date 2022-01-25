import ts from 'gulp-typescript'
import path from 'path'
import { src, dest, series, parallel } from 'gulp'
import { run, withTaskName } from './build/utils'
import { distPath, projectRoot } from './build/utils/paths'
import rename from 'gulp-rename'

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

const buildPackages = () => {
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
    ...buildPackages(),
    withTaskName(`copy-files`, copyWebsocketClientFiles)
  )
)
