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
import { RoutesContainer, TabsNavigator } from './Navigation';
import { ReactNode, useCallback } from 'react';
import DrawerLayout from './DrawerLayout';
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
  const drawerLayout = useCallback(({ children }: { children: ReactNode }) => {
    return <DrawerLayout>
      {children}
    </DrawerLayout>
  }, []);

  const { colorScheme, } = useTheme();

  return (
    <>
      <ThemeProvider theme={colorScheme}>
        <GestureHandlerRootView style={styles.container}>
          <RoutesContainer>
            <TabsNavigator layout={drawerLayout} />
          </RoutesContainer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
