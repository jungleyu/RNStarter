import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeName, useTheme } from "../ThemeContext";
import { useLingui, } from "@lingui/react/macro";
import { i18n } from "@lingui/core";
import { dynamicActivate } from "../locale/i18n";
import SettingCard, { SettingCardItem } from "../components/SettingCard";

// function capitalized(word: string) {
//     return word.charAt(0).toUpperCase()
//         + word.slice(1)
// }

export default function Settings() {
    const { colorScheme, setTheme, colors } = useTheme();
    const { t } = useLingui();
    const [locale, setLocale] = useState(i18n.locale);

    const onThemePress = useCallback((theme: SettingCardItem) => {
        setTheme?.(theme.name as unknown as ThemeName)
    }, [setTheme])

    const switchLanguage = useCallback((loc: SettingCardItem) => {
        setLocale(loc.name);
        dynamicActivate(loc.name);
    }, []);

    const themes = [{ label: t`light`, name: 'light' }, { label: t`dark`, name: 'dark' }];
    const languages = [{
        label: '简体中文',
        name: 'zh-CN'
    }, {
        label: 'English',
        name: 'en'
    }]

    return <View style={[styles.content, { backgroundColor: colors.background }]}>
        <SettingCard
            title={t`Theme`}
            items={themes}
            onPress={onThemePress}
            initialIndex={themes.findIndex(el => el.name === colorScheme)} />

        <SettingCard
            title={t`Select Language`}
            items={languages}
            onPress={switchLanguage}
            initialIndex={languages.findIndex(el => el.name === locale)}
        />


        {/* <Text style={styles.sectionTitle}>{t`Select Language`}</Text>
        <View style={[styles.section, { backgroundColor: colors.card, }]}>
            {
                lauguage.map((l: { name: string, locale: string }) => {
                    const isActive = l.locale === locale;
                    return <Pressable
                        onPress={() => {
                            !isActive && switchLanguage(l)
                        }}
                        key={l.name}
                        style={[
                            styles.row,
                            { borderColor: colors.border },
                            isActive ? { backgroundColor: colors.primary } : undefined]}>
                        <Text
                            style={[
                                styles.themeText,
                                { color: colors.text },
                                isActive ? styles.activeText : undefined]}>
                            {l.name}
                        </Text>
                    </Pressable>
                })
            }
        </View> */}
    </View >
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 12,
    },
    sectionTitle: {
        fontWeight: 700,
        marginVertical: 8,
        marginHorizontal: 12,
        color: '#555',
        fontSize: 12,
    },
    section: {
        marginHorizontal: 8,
        borderWidth: 0.01,
        borderColor: 'transparent',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderBottomWidth: .5,
        borderBottomColor: '#f1f1f1',
    },
    themeText: {
        fontSize: 14,
        fontWeight: 500,
    },
    activeText: {
        fontWeight: 700,
        color: '#FFF'
    }
})