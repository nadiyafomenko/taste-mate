import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/contexts/RootStoreContext';
import { Text, Heading } from '@gluestack-ui/themed';

const HomeScreen = observer(() => {
  const { authStore: { user } } = useStores();

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <Heading size="2xl">Home</Heading>
        {user && <Text>Welcome back, {user.name}!</Text>}
      </View>
    </>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
