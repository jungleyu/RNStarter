import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { ComponentProps, PropsWithChildren, useCallback } from "react";
import Profile from "./screens/Profile";

const Tab = createBottomTabNavigator();
const HomeTab = createNativeStackNavigator();
const ProfileTab = createNativeStackNavigator();

function screenOptions() {
    return {
        fullScreenGestureEnabled: true,
        headerShown: false,
    } as const;
}

function HomeTabNavigator() {
    return (
        <HomeTab.Navigator initialRouteName="Home" screenOptions={screenOptions()}>
            <HomeTab.Screen name="Home" getComponent={() => Home} />
        </HomeTab.Navigator>
    )
}

function ProfileTabNavigator() {
    return (
        <ProfileTab.Navigator initialRouteName="Profile" screenOptions={screenOptions()}>
            <ProfileTab.Screen name="Profile" getComponent={() => Profile} />
        </ProfileTab.Navigator>
    )
}

function TabsNavigator({ layout }: { layout: ComponentProps<typeof Tab.Navigator>['layout'] }) {
    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            initialRouteName="HomeTab"
            layout={layout}
            screenOptions={{ headerShown: false, lazy: true }}>
            <Tab.Screen name="HomeTab" getComponent={() => HomeTabNavigator} />
            <Tab.Screen name="ProfileTab" getComponent={() => ProfileTabNavigator} />
        </Tab.Navigator>
    )
}

function RoutesContainer({ children }: PropsWithChildren<{}>) {
    return (
        <NavigationContainer>
            {children}
        </NavigationContainer>
    )
}

export {
    RoutesContainer,
    TabsNavigator
}