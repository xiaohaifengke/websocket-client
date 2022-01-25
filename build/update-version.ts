import { series } from 'gulp'
import { withTaskName } from './utils'
import fs from 'fs'
import path from 'path'

function getPkgContent(filepath: string): string {
  return fs.readFileSync(filepath, 'utf-8')
}

function updatePkgs(version: string) {
  const pkgPaths = [
    path.resolve(__dirname, 'pkg.json'),
    path.resolve(__dirname, '../package.json')
  ]

  pkgPaths.forEach((pkgPath) => {
    const content = getPkgContent(pkgPath).replace(
      /"version"\s*:\s*"[^"]+"/,
      `"version": "${version}"`
    )
    fs.writeFileSync(pkgPath, content)
  })
}

export default series(
  withTaskName('updatePkgs', async () => {
    const pkg = require('../package.json')
    updatePkgs(pkg.version)
  })
)
