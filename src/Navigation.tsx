import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { NavigationContainer, TypedNavigator } from "@react-navigation/native";
import { ComponentProps, PropsWithChildren, } from "react";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import { useTheme } from "./ThemeContext";

const Tab = createBottomTabNavigator();
const HomeTab = createNativeStackNavigator();
const ProfileTab = createNativeStackNavigator();

function screenOptions() {
    return {
        fullScreenGestureEnabled: true,
        headerShown: false,
    } as const;
}

function commonScreen(Stack: TypedNavigator<any>) {
    return <>
        <Stack.Screen name="Settings" getComponent={() => Settings} options={{
            headerShown: true,
            gestureEnabled: true,
        }} />
    </>
}

function HomeTabNavigator() {
    return (
        <HomeTab.Navigator initialRouteName="Home" screenOptions={screenOptions()}>
            <HomeTab.Screen name="Home"
                getComponent={() => Home}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                }} />
            {commonScreen(HomeTab)}
        </HomeTab.Navigator>
    )
}

function ProfileTabNavigator() {
    return (
        <ProfileTab.Navigator initialRouteName="Profile" screenOptions={screenOptions()}>
            <ProfileTab.Screen
                name="Profile"
                getComponent={() => Profile}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'Me'
                }} />
            {commonScreen(ProfileTab)}
        </ProfileTab.Navigator>
    )
}

function TabsNavigator({ layout }: { layout: ComponentProps<typeof Tab.Navigator>['layout'] }) {
    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            initialRouteName="HomeTab"
            layout={layout}
            screenOptions={{
                headerShown: false, lazy: true, tabBarLabelStyle: {
                    transform: [{
                        translateY: 10
                    }],
                    fontSize: 16,
                },
                tabBarIconStyle: {
                    display: 'none'
                }
            }}>
            <Tab.Screen
                name="HomeTab"
                getComponent={() => HomeTabNavigator}
                options={{
                    tabBarLabel: 'Home',
                }} />
            <Tab.Screen
                name="ProfileTab"
                getComponent={() => ProfileTabNavigator}
                options={{
                    tabBarLabel: 'Me',
                }} />
        </Tab.Navigator>
    )
}

function RoutesContainer({ children }: PropsWithChildren<{}>) {
    const theme = useTheme();
    return (
        <NavigationContainer theme={theme}>
            {children}
        </NavigationContainer>
    )
}

export {
    RoutesContainer,
    TabsNavigator
}