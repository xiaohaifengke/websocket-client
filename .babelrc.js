const babel_env = process.env.BABEL_ENV || 'es'
let loose = false
let modules = false
let useESModules = false

switch (babel_env) {
  case 'es':
    useESModules = true
    break
  case 'lib':
    useESModules = false
    break
}

const presets = [
  [
    '@babel/preset-env',
    {
      loose,
      modules,
      targets: {
        chrome: '16',
        firefox: '11',
        safari: '7',
        ie: '10',
        edge: '12',
        opera: '12.1',
        android: '4.4',
        ios: '6'
      },
      useBuiltIns: false
    }
  ]
]
const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-optional-chaining',
  ['@babel/transform-runtime', { useESModules }]
]

module.exports = { presets, plugins }
