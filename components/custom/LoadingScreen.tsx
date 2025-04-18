import { ActivityIndicator, View } from 'react-native';

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <ActivityIndicator size="large" />
  </View>
);

export default LoadingScreen;
