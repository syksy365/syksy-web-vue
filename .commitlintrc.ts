import type { UserConfig } from 'cz-git'
import { RuleConfigSeverity } from '@commitlint/types'
import fg from 'fast-glob'

function getPackages(packagePath) {
    return fg.sync('*', { cwd: packagePath, onlyDirectories: true })
}

const scopes = [
    ...getPackages('src'),
    ...getPackages('src/components'),
    ...getPackages('src/hooks'),
    ...getPackages('src/views'),
]

export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        /**
         * type[scope]: [function] description
         *      ^^^^^
         */
        'scope-enum': [RuleConfigSeverity.Error, 'always', scopes],
        /**
         * type[scope]: [function] description
         *
         * ^^^^^^^^^^^^^^ empty line.
         * - Something here
         */
        'body-leading-blank': [RuleConfigSeverity.Warning, 'always'],
        /**
         * type[scope]: [function] description
         *
         * - something here
         *
         * ^^^^^^^^^^^^^^
         */
        'footer-leading-blank': [RuleConfigSeverity.Warning, 'always'],
        /**
         * type[scope]: [function] description [No more than 72 characters]
         *      ^^^^^
         */
        'header-max-length': [RuleConfigSeverity.Error, 'always', 72],
        'scope-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
        'subject-empty': [RuleConfigSeverity.Disabled, 'never'],
        'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'],
        'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
        'type-empty': [RuleConfigSeverity.Disabled, 'never'],
        /**
         * type[scope]: [function] description
         * ^^^^
         */
        'type-enum': [
            RuleConfigSeverity.Error,
            'always',
            [
                'feature',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'build',
                'ci',
                'revert',
                'other',
                'chore',
            ],
        ],
    },
    prompt: {
        useEmoji: true,
        messages: {
            type: '选择你要提交的类型 :',
            scope: '选择一个提交范围（可选）:',
            customScope: '请输入自定义的提交范围 :',
            subject: '填写简短精炼的变更描述 :\n',
            body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
            breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
            footerPrefixesSelect: '选择关联issue前缀（可选）:',
            customFooterPrefix: '输入自定义issue前缀 :',
            footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
            generatingByAI: '正在通过 AI 生成你的提交简短描述...',
            generatedSelectByAI: '选择一个 AI 生成的简短描述:',
            confirmCommit: '是否提交或修改commit ?',
        },
        types: [
            { value: 'feature', name: '✨ feature: 新增功能' },
            { value: 'fix', name: '🐛 fix: 修复缺陷' },
            { value: 'docs', name: '📚 docs: 文档变更' },
            { value: 'style', name: '💅 style: 代码格式（不影响功能，例如空格、分号等格式修正）' },
            { value: 'refactor', name: '🔨 refactor: 代码重构（不包括 bug 修复、功能新增）' },
            { value: 'perf', name: '🚀 perf: 性能优化' },
            { value: 'test', name: '🔍 test: 添加疏漏测试或已有测试改动' },
            { value: 'build', name: '👷 build: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
            { value: 'ci', name: '🎲 ci: 修改 CI 配置、脚本' },
            { value: 'revert', name: '⏪ revert: 回滚 commit' },
            { value: 'other', name: '📦 other: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
            { value: 'chore', name: '🚧 chore: 其他修改，杂活' },
        ],
    },
} as UserConfig
