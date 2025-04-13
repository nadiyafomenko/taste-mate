import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        {user && (
          <>
            <Text style={styles.text}>Welcome, {user.name}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 