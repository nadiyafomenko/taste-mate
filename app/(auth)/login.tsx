import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Input, InputField, Button, ButtonText, Text } from "@/components";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {} catch (error) {
      Alert.alert('Error', 'Failed to login with Google.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Taste Mate</Text>
        
        <Input style={styles.input}>
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Input>

        <Input style={styles.input}>
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Input>

        <Button onPress={handleLogin} style={styles.button}>
          <ButtonText>Login</ButtonText>
        </Button>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button onPress={handleGoogleLogin} style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
  },
}); 