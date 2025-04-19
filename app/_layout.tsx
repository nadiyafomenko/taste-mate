// app/_layout.tsx
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@/components/ui/gluestack-ui-provider/config';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';
import RootNavigation from './RootNavigation';
import { RootStoreProvider } from '@/contexts/RootStoreContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <RootStoreProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style="auto" />
          <RootNavigation />
        </View>
      </RootStoreProvider>
    </GluestackUIProvider>
  );
}
