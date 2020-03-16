module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    env: {
        es6: true,
        node: true,
        browser: true
    },
    parser: 'babel-eslint',
    extends: [
        'eslint:recommended'
    ],
    globals: {},
    rules: {
        'no-console': 0,
        'spaced-comment': 2,
        'no-multiple-empty-lines': 2,
        'multiline-comment-style': 2,
        'prefer-const': 2,
        'lines-around-comment': 2,
        'eqeqeq': 2
    }
}
