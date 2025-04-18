import React, { useState } from 'react';
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
} from '@gluestack-ui/themed';
import { EyeIcon, EyeOffIcon } from '@gluestack-ui/themed';

const SignupScreen = observer(() => {
  const { authStore } = useStores();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {
      await authStore.signup(email, password);
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
            <Text size="2xl" bold>Create an account</Text>
            <HStack space="xs">
              <Text size="sm" color="$textLight400">Already have an account?</Text>
              <Pressable onPress={() => router.push('/(auth)/login')}>
                <Text size="sm" color="$primary600" fontWeight="$medium">Login</Text>
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

            <Button
              onPress={handleSignup}
              isDisabled={authStore.isLoading}
              size="lg"
            >
              <ButtonText>Create Account</ButtonText>
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

export default SignupScreen; 