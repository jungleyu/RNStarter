import { useCallback, } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { ThemeName, useTheme } from "../ThemeContext";

const themes = ['light', 'dark'];

function capitalized(word: string) {
    return word.charAt(0).toUpperCase()
        + word.slice(1)
}

export default function Settings() {
    const { colorScheme, setTheme, colors } = useTheme();
    console.log('colorScheme: ', colorScheme);
    console.log('colors: ', colors);

    const onThemePress = useCallback((newTheme: ThemeName) => {
        if (newTheme === null) {
            newTheme = 'light';
        }
        setTheme?.(newTheme)
    }, [setTheme])

    return <View style={styles.content}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={[styles.section, { backgroundColor: colors.background, }]}>
            {
                themes.map((t) => {
                    const isActive = t === colorScheme;
                    return <Pressable
                        onPress={() => onThemePress(t as ThemeName)}
                        key={t}
                        style={[
                            styles.row,
                            { borderColor: colors.border },
                            isActive ? { backgroundColor: colors.primary } : undefined]}>
                        <Text
                            style={[
                                styles.themeText,
                                { color: colors.text },
                                isActive ? styles.activeText : undefined]}>
                            {capitalized(t)}
                        </Text>
                    </Pressable>
                })
            }
        </View>
        <Text style={styles.tips}>Automatic is only supported on operating systems that allow you to control the system-wide color scheme.</Text>
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
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginHorizontal: 8,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderWidth: .5,
        borderColor: '#f1f1f1'
    },
    themeText: {
        fontSize: 14,
        fontWeight: 500,
    },
    tips: {
        fontSize: 12,
        color: '#666',
        marginHorizontal: 20,
        marginVertical: 12,
    },
    active: {
        backgroundColor: '#fcfcfc'
    },
    activeText: {
        fontWeight: 700,
    }
})