import { i18n, Messages } from "@lingui/core";

const localeLoaders: {
    [key: string]: () => Promise<{
        messages: Messages
    }>
} = {
    'en': () => import('./locales/en/messages'),
    'zh-CN': () => import('./locales/zh-CN/messages'),
}

export async function dynamicActivate(locale: string) {
    if (!localeLoaders[locale]) {
        locale = 'en';
    }
    const { messages } = await localeLoaders[locale]();
    i18n.load(locale, messages);
    i18n.activate(locale);
}