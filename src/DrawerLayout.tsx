import { ReactNode, useCallback, } from "react";
import { StyleSheet, Text, useWindowDimensions, View, } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import useDrawer from "./hooks/useDrawer";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import Divider from "./components/Divider";
import { useNavigation } from "@react-navigation/native";
import UserInfo from "./components/UserInfo";
import { useTheme } from "./ThemeContext";

function MenuItem({ title, onPress }: { title: string, onPress: () => void }) {
    const { colors } = useTheme();
    return <Pressable
        style={[styles.menuItem, { backgroundColor: colors.active_background }]}
        onPress={onPress}>
        <Text style={[styles.menuText, { color: colors.text }]}>{title}</Text>
    </Pressable>
}

export default function DrawerLayout({ children }: { children: ReactNode }) {
    const {
        open,
        setOpen,
    } = useDrawer()
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const { colors, dark } = useTheme()

    const renderDrawerContent = useCallback(() => {
        console.log(navigation.getState())
        return (
            <>
                <UserInfo />
                <Divider />
                <ScrollView contentContainerStyle={styles.scroll}>
                    <MenuItem title="Home" onPress={() => {
                        setOpen(false);
                        navigation.navigate('HomeTab')
                    }} />
                    <MenuItem title="Profile" onPress={() => {
                        setOpen(false);
                        navigation.navigate('ProfileTab')
                    }} />
                    <MenuItem title="Settings" onPress={() => {
                        setOpen(false);
                        navigation.navigate('Settings')
                    }} />
                </ScrollView>
                <View style={styles.footer}></View>
            </>
        )
    }, [setOpen, navigation]);

    return <Drawer
        drawerStyle={{
            width: Math.min(400, width * 0.8),
            backgroundColor: colors.elevation_background,
        }}
        renderDrawerContent={renderDrawerContent}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        overlayStyle={{
            backgroundColor: dark ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.4)'
        }}>
        {children}
    </Drawer>
}

const styles = StyleSheet.create({
    scroll: {
        paddingTop: 20,
    },
    menuItem: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 8,
    },
    menuText: {
        fontWeight: 500
    },
    footer: {
        backgroundColor: 'orange',
        height: 128
    }
})