import { useCallback } from 'react';
import { useLingui } from "@lingui/react/macro";
import { View } from "react-native";
import { Button } from '@react-navigation/elements';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

export default function Test() {
    const { t } = useLingui();
    const { colors } = useTheme();
    const navigation = useNavigation();
    const goTo = useCallback(() => {
        navigation.dispatch(StackActions.push('Test'));
    }, [navigation])

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <Button onPress={goTo}>{t`Go to`}</Button>
    </View>
}