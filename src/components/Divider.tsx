import { View } from "react-native";
import { useTheme } from "../ThemeContext";

export default function Divider({ size }: { size?: number }) {
    const { colors } = useTheme();
    return <View style={{ height: size ?? 1, backgroundColor: colors.border }} />
}