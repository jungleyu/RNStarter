/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StyleSheet, } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NavContainer } from './Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from './ThemeContext';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { colorScheme, colors } = useTheme();

  return (
    <>
      <ThemeProvider theme={colorScheme}>
        <GestureHandlerRootView style={[styles.container, { backgroundColor: colors.background }]}>
          <NavContainer />
        </GestureHandlerRootView>
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
