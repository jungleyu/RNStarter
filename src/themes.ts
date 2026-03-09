import { Theme } from "./ThemeContext";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const defaultTheme: Theme = {
    colorScheme: 'light',
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors, ...{
            elevation_background: '#FFF',
            active_background: 'rgba(0, 0, 0, 0.03)'
        }
    }
}

export const darkTheme: Theme = {
    ...defaultTheme,
    colorScheme: 'dark',
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors, ...{
            elevation_background: '#181818',
            active_background: 'rgba(255, 255, 255, 0.04)'
        }
    }
}