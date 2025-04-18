import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/contexts/RootStoreContext';
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Button,
  ButtonText,
  Text,
  Box,
  HStack,
  Divider,
  Pressable,
  VStack,
  Center,
  Icon
} from '@gluestack-ui/themed';
import { EyeIcon, EyeOffIcon } from '@gluestack-ui/themed';

const LoginScreen = observer(() => {
  const { authStore } = useStores();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await authStore.login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      // Error handled silently
    }
  };

  return (
    <Box flex={1} bg="$backgroundLight0">
      <Stack.Screen options={{ headerShown: false }} />
      <Center flex={1} px="$6">
        <VStack space="xl" w="$full" maxWidth="$96">
          <VStack space="xs">
            <Text size="2xl" bold>Login to your account</Text>
            <HStack space="xs">
              <Text size="sm" color="$textLight400">Don't have an account?</Text>
              <Pressable onPress={() => router.push('/(auth)/signup')}>
                <Text size="sm" color="$primary600" fontWeight="$medium">Sign up</Text>
              </Pressable>
            </HStack>
          </VStack>

          <VStack space="lg">
            <VStack space="xs">
              <Text color="$textLight500">Email</Text>
              <Input size="lg">
                <InputField
                  placeholder="abc@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text color="$textLight500">Password</Text>
              <Input size="lg">
                <InputField
                  placeholder="Enter password"
                  value={password}
                  onChangeText={setPassword}
                  type={showPassword ? "text" : "password"}
                />
                <InputSlot pr="$4" pl="$3" onPress={() => setShowPassword(!showPassword)}>
                  <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} color="$textLight400" />
                </InputSlot>
              </Input>
            </VStack>

            <Box alignItems="flex-end">
              <Pressable>
                <Text size="sm" color="$primary600" fontWeight="$medium">Forgot Password?</Text>
              </Pressable>
            </Box>

            <Button
              onPress={handleLogin}
              isDisabled={authStore.isLoading}
              size="lg"
            >
              <ButtonText>Login</ButtonText>
            </Button>

            <VStack space="lg" mt="$2">
              <HStack alignItems="center" space="sm">
                <Divider flex={1} />
                <Text color="$textLight400" size="sm">OR</Text>
                <Divider flex={1} />
              </HStack>

              <Button
                variant="outline"
                action="secondary"
                onPress={() => {}}
                size="lg"
              >
                <ButtonText>Continue with Google</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '$backgroundLight0'
  }
});

export default LoginScreen;
