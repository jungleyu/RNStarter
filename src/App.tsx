/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { RoutesContainer, TabsNavigator } from './Navigation';
import { ReactNode, useCallback } from 'react';
import DrawerLayout from './DrawerLayout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const drawerLayout = useCallback(({ children }: { children: ReactNode }) => {
    return <DrawerLayout>
      {children}
    </DrawerLayout>
  }, [])

  return (
    <GestureHandlerRootView style={styles.container}>
      <RoutesContainer>
        <TabsNavigator layout={drawerLayout} />
      </RoutesContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
