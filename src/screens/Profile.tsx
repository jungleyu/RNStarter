import { useLingui } from "@lingui/react/macro";
import { Text, View } from "react-native";

export default function Profile() {
    const { t } = useLingui();
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{t`Profile screen`}</Text>
    </View>
}