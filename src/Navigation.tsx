import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, NavigatorScreenParams, TypedNavigator, } from "@react-navigation/native";
import Home from "./screens/Home";
import CreateTab from "./components/CreateTab";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import { useTheme } from "./ThemeContext";
import { useCallback, } from "react";
import { createDrawerNavigator, } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import { useWindowDimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Breadcrumb from "./components/Breadcrumb";
import { useLingui } from "@lingui/react/macro";
import { I18n } from "@lingui/core";
import Test from "./screens/Test";

export type CommonStackParamList = {
    Settings: undefined
}

type TabsParamList = {
    Home: undefined,
    CreateTab: undefined,
    Profile: undefined,
}

type DrawerParamList = {
    Main: NavigatorScreenParams<TabsParamList>,
}

type RootStackParamList = CommonStackParamList & {
    Drawer: NavigatorScreenParams<TabsParamList>
}

const RootStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function screenOptions(screenWidth: number) {
    return {
        headerShown: false,
        headerTitleAlign: 'center',
        gestureEnabled: true,
        gestureResponseDistance: Math.min(300, screenWidth / 2),
        gestureVelocityImpact: 0.8
    } as const;
}

function commonScreen(Stack: TypedNavigator<any>, i18n: I18n) {
    const stackOptions = {
        headerShown: true,
        animation: 'slide_from_right',
    }
    return <>
        <Stack.Screen name="Settings" getComponent={() => Settings}
            options={{
                ...stackOptions,
                title: i18n.t('Settings'),
            }} />
        <Stack.Screen name="Test" getComponent={() => Test}
            options={{
                ...stackOptions,
                title: i18n.t('Test'),
            }} />
    </>
}

function AppStack() {
    const { width } = useWindowDimensions();
    const { i18n } = useLingui();

    return (
        <RootStack.Navigator initialRouteName="Drawer" screenOptions={screenOptions(width)}>
            <RootStack.Screen name="Drawer" getComponent={() => DrawerNavigator} />
            {
                commonScreen(RootStack, i18n)
            }
        </RootStack.Navigator>
    )
}

function TabsNavigator() {
    const createCreateTabButton = useCallback(() => {
        return <CreateTab />
    }, []);
    const { t } = useLingui();
    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            initialRouteName="Home"
            screenOptions={{
                lazy: true,
                tabBarLabelStyle: {
                    transform: [{
                        translateY: 10
                    }],
                    fontSize: 16,
                },
                tabBarIconStyle: {
                    display: 'none'
                },
                headerTitleAlign: 'center',
            }}>
            <Tab.Screen
                name="Home"
                getComponent={() => Home}
                options={{
                    title: t`Home`
                }} />
            <Tab.Screen
                name="CreateTab"
                getComponent={() => () => null}
                options={{
                    tabBarButton: createCreateTabButton,
                }}
            />
            <Tab.Screen
                name="Profile"
                getComponent={() => Profile}
                options={{
                    title: t`Me`,
                    headerLeft: Breadcrumb
                }}
            />
        </Tab.Navigator>
    )
}

function DrawerNavigator() {
    const { width } = useWindowDimensions();
    const { dark } = useTheme();
    return (
        <Drawer.Navigator
            screenOptions={{
                ...screenOptions(width),
                ...{
                    overlayColor: dark ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.2)',
                    drawerStyle: {
                        width: Math.min(300, width * .8)
                    },
                    swipeEnabled: false,
                }
            }}
            drawerContent={DrawerContent} >
            <Drawer.Screen name="Main" component={TabsNavigator} />
        </Drawer.Navigator >
    )
}

function NavContainer() {
    const theme = useTheme();
    return (
        <NavigationContainer theme={theme}>
            <AppStack />
        </NavigationContainer>
    )
}

export {
    NavContainer
}