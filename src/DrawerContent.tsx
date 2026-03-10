import { NavigationProp, useNavigation } from "@react-navigation/native";
import UserInfo from "./components/UserInfo";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Divider from "./components/Divider";
import { useCallback } from "react";
import { CommonStackParamList } from "./Navigation";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const navigation = useNavigation<NavigationProp<CommonStackParamList>>();
    const openSettings = useCallback(() => {
        navigation.navigate('Settings')
    }, [navigation]);
    return <>
        <UserInfo />
        <Divider />
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label={'Settings'}
                onPress={openSettings} />
        </DrawerContentScrollView>
    </>
}