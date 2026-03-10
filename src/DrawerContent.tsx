import { NavigationProp, useNavigation } from "@react-navigation/native";
import UserInfo from "./components/UserInfo";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Divider from "./components/Divider";
import { useCallback } from "react";
import { CommonStackParamList } from "./Navigation";
import { useLingui } from "@lingui/react/macro";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const navigation = useNavigation<NavigationProp<CommonStackParamList>>();
    const openSettings = useCallback(() => {
        navigation.navigate('Settings')
    }, [navigation]);
    const { t } = useLingui();
    return <>
        <UserInfo />
        <Divider />
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label={t`Settings`}
                onPress={openSettings} />
        </DrawerContentScrollView>
    </>
}