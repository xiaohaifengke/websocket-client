const babel_env = process.env.BABEL_ENV || 'es'
let loose = false
let modules = false
let useESModules = false

switch (babel_env) {
    // case 'cjs':
    //     loose = true
    //     modules = 'cjs'
    //     useESModules = false
    //     break
    case 'es':
        loose = true
        modules = false
        useESModules = true
        break
    case 'window':
        loose = false
        modules = false
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
                edge: '17',
                firefox: '48',
                chrome: '49',
                safari: '11.1'
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
