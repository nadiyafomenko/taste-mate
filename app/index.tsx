import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useStores } from '@/contexts/RootStoreContext';
import { observer } from 'mobx-react-lite';

const Index = observer(() => {
  const { authStore: { isAuthenticated, isLoading } } = useStores();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? "/(tabs)" : "/(auth)/login"} />;
});

export default Index;
