import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeColors, useTheme } from "../ThemeContext";
import { useState } from "react";

export type SettingCardItem = {
    name: string,
    label: string,
}

export default function SettingCard({ title, items, onPress, initialIndex }: {
    title: string,
    items: SettingCardItem[],
    onPress?: (item: SettingCardItem) => void,
    initialIndex?: number,
}) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);

    return <>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.card}>
            {
                items.map((item: SettingCardItem, index: number) => {
                    const isActive = index === activeIndex;
                    return <Pressable
                        onPress={() => {
                            setActiveIndex(index);
                            onPress?.(item);
                        }}
                        key={item.name}
                        style={[
                            styles.row,
                            isActive && styles.activeBg]}>
                        <Text
                            style={[styles.text, isActive && styles.activeText]}>
                            {item.label}
                        </Text>
                    </Pressable>
                })
            }
        </View>
    </>
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    title: {
        fontWeight: 700,
        marginVertical: 8,
        marginHorizontal: 12,
        color: '#555',
        fontSize: 12,
    },
    card: {
        marginHorizontal: 8,
        borderWidth: 0.01,
        borderColor: 'transparent',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 10,
        backgroundColor: colors.card,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderBottomWidth: .5,
        borderBottomColor: colors.border,
    },
    text: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.text
    },
    activeBg: {
        backgroundColor: colors.primary
    },
    activeText: {
        fontWeight: 700,
        color: '#FFF'
    }
})