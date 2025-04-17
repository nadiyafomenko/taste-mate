import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Heading, Text, Button, ButtonText } from "@/components";

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
        <Heading >Profile</Heading>
        {user && (
          <>
            <Text >Welcome, {user.name}</Text>
            <Text>Email: {user.email}</Text>
          </>
        )}
        <Button variant='link' onPress={handleLogout}>
          <ButtonText>Logout</ButtonText>
        </Button>
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