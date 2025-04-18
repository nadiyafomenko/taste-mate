import { Redirect, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/contexts/RootStoreContext';

const AuthLayout = observer(() => {
  const { authStore: { isAuthenticated } } = useStores();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ title: 'Login', headerShown: false }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
});

export default AuthLayout;
