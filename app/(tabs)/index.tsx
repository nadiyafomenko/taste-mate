import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Text, Heading } from "@/components";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <Heading size="2xl">Home</Heading>
        {user && <Text>Welcome back, {user.name}!</Text> }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
}); 