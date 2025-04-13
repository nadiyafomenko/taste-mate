import { Stack } from 'expo-router';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <GluestackUIProvider mode="light"><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View></GluestackUIProvider>
    );
  }

  return (
    <GluestackUIProvider mode="light"><Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack></GluestackUIProvider>
  );
}

export default function RootLayout() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <GluestackUIProvider mode="system">
      <AuthProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style="auto" />
          <RootLayoutNav />
        </View>
      </AuthProvider>
      </GluestackUIProvider>
  );
}
