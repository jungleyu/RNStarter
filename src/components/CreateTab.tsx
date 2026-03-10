import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useCallback, useRef } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native"
import Divider from "./Divider";
import { ThemeColors, useTheme } from "../ThemeContext";
import { useLingui } from "@lingui/react/macro";

export default function CreateTab() {
    const sheet = useRef<TrueSheet>(null);
    const { t } = useLingui();

    const open = useCallback(async () => {
        await sheet.current?.present();
    }, []);
    const onPress = useCallback(async () => {
        await sheet.current?.dismiss();
    }, []);

    const { colors } = useTheme();
    const styles = createStyles(colors);

    function renderCreateItems() {
        return <View style={[styles.items]}>
            <Pressable onPress={onPress} style={styles.item}>
                <Text style={styles.itemText}>{t`Choose from album`}</Text>
            </Pressable>
            <Pressable onPress={onPress} style={styles.item}>
                <Text style={styles.itemText}>{t`Camera`}</Text>
                <Text style={styles.itemSubText}>{t`Capture & Go Live`}</Text>
            </Pressable>
            <Pressable onPress={onPress} style={styles.item}>
                <Text style={styles.itemText}>{t`Text`}</Text>
            </Pressable>
            <Divider size={8} />
            <Pressable onPress={onPress} style={styles.item}>
                <Text style={styles.itemText}>{t`Cancel`}</Text>
            </Pressable>
        </View>
    }

    return <View style={styles.container}>
        <Pressable
            onPress={open}
            style={styles.btn}>
            <Text style={styles.text}>+</Text>
        </Pressable>
        <TrueSheet ref={sheet} detents={['auto']} grabber={false}>
            {renderCreateItems()}
        </TrueSheet>
    </View>
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: 'rgba(255,0,0,.7)',
        height: 36,
        width: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        transform: [{
            translateY: -25
        }]
    },
    text: {
        fontSize: 30,
        fontWeight: '600',
        color: colors.text,
    },
    items: {
        backgroundColor: colors.elevation_background
    },
    item: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: .5,
        borderTopColor: colors.border,
    },
    itemText: {
        fontSize: 18,
        color: colors.text,
    },
    itemSubText: {
        fontSize: 12,
        color: colors.text,
    }
})