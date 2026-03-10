import { defineConfig } from '@lingui/cli'

export default defineConfig({
    sourceLocale: 'en',
    locales: [
        'zh-CN',
        'en'
    ],
    catalogs: [
        {
            path: '<rootDir>/src/locale/locales/{locale}/messages',
            include: ['src'],
        },
    ],
    format: "po"
})