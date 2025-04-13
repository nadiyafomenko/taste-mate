import { Redirect } from 'expo-router';
import { Stack } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
        <Stack.Screen
          name="login"
          options={{ title: 'Login',headerShown: false }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
} 