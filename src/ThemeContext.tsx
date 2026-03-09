import { createContext, FC, ReactNode, useContext, useState } from "react";
import { defaultTheme, darkTheme } from "./themes";
import { type Theme as NativeTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";

export type ThemeName = 'light' | 'dark';

export type ColorScheme = 'light' | 'dark';

// export type Colors = {
//     [key: string]: string
// }

export interface Theme extends NativeTheme {
    colorScheme: ColorScheme,
    colors: NativeTheme['colors'] & {
        [key: string]: string
    }
}

export interface ThemeProviderProps {
    children?: ReactNode
    theme: ThemeName
}

export const ThemeContext = createContext<Theme & { setTheme?: (theme: ThemeName) => void }>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

function getTheme(theme: ThemeName) {
    switch (theme) {
        case 'dark':
            return darkTheme;
        case 'light':
        default:
            return defaultTheme;
    }
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
    const [innerTheme, setInnerTheme] = useState(theme);
    const themeValue = getTheme(innerTheme);
    return <ThemeContext.Provider value={{ ...themeValue, ...{ setTheme: setInnerTheme } }}>
        <StatusBar barStyle={themeValue.dark ? 'light-content' : 'dark-content'} />
        {children}
    </ThemeContext.Provider>
}