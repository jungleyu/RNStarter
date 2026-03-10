import { Text } from "react-native";
import { HeaderButton, HeaderButtonProps } from "@react-navigation/elements";
import { useTheme } from "../ThemeContext";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export default function Breadcrumb(props: Omit<HeaderButtonProps, 'children'>) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer());
    }, [navigation])

    return <HeaderButton
        {...props}
        onPress={openDrawer}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>三</Text>
    </HeaderButton>
}