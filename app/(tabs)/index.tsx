import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        {user && (
          <Text style={styles.welcomeText}>Welcome back, {user.name}!</Text>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
  },
}); 