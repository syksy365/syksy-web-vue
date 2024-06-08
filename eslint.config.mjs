import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: 4, // 2, 4, or 'tab'
        quotes: 'single', // or 'double'
    },
    rules: {
        // 可以存在没有使用的值
        'unused-imports/no-unused-vars': 'warn',
        // 允许使用console
        'no-console': 'warn',
        // 允许使用 process 因为vite.config.ts中会用到
        'node/prefer-global/process': 'off',
    },
})
