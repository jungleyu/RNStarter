import { View, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext";

export default function UserInfo() {
    const { colors } = useTheme();
    return (
        <View style={styles.userInfo}>
            <View style={[styles.infoBg, { backgroundColor: colors.background }]} />
            <View style={[styles.avatar, { backgroundColor: colors.background, borderColor: colors.border }]} />
            <View style={[styles.userName, { backgroundColor: colors.background }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row',
        height: 160,
        position: 'relative',
    },
    infoBg: {
        height: 96,
        width: '100%',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 2,
        zIndex: 9,
        position: 'absolute',
        top: 96 - 48,
        left: 10,
    },
    userName: {
        height: 24,
        width: 128,
        borderRadius: 12,
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
})