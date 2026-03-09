import { View } from "react-native";
import { useTheme } from "../ThemeContext";

export default function Divider() {
    const { colors } = useTheme();
    return <View style={{ height: 1, backgroundColor: colors.border }} />
}