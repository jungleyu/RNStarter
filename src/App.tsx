/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StyleSheet, Text, } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NavContainer } from './Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from './ThemeContext';
import { i18n } from '@lingui/core';
import { I18nProvider, TransRenderProps } from '@lingui/react';
import { dynamicActivate } from './locale/i18n';
import { useEffect } from 'react';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function DefaultI18nComponent(props: TransRenderProps) {
  return <Text>{props.children}</Text>
}

function AppContent() {
  const { colorScheme, colors } = useTheme();
  useEffect(() => {
    dynamicActivate('en');
  }, []);
  return (
    <>
      <ThemeProvider theme={colorScheme}>
        <I18nProvider i18n={i18n} defaultComponent={DefaultI18nComponent}>
          <GestureHandlerRootView style={[styles.container, { backgroundColor: colors.background }]}>
            <NavContainer />
          </GestureHandlerRootView>
        </I18nProvider>
      </ThemeProvider >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
