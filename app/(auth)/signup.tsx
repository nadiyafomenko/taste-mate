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
  Pressable,
  VStack,
  Center,
  Heading,
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
          <VStack space="xs" mb="$4">
            <Heading size="2xl">Create Account</Heading>
            <Text size="lg" color="$textLight500">
              Join our community of food lovers
            </Text>
          </VStack>

          <VStack space="lg">
            <VStack space="xs">
              <Text color="$textLight500" size="sm">Email</Text>
              <Input
                size="lg"
                borderRadius="$lg"
                borderColor={email ? "$primary500" : "$borderLight200"}
              >
                <InputField
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text color="$textLight500" size="sm">Password</Text>
              <Input
                size="lg"
                borderRadius="$lg"
                borderColor={password ? "$primary500" : "$borderLight200"}
              >
                <InputField
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  type={showPassword ? "text" : "password"}
                />
                <InputSlot pr="$4" onPress={() => setShowPassword(!showPassword)}>
                  <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} color="$textLight400" />
                </InputSlot>
              </Input>
            </VStack>

            <VStack space="md" mt="$4">
              <Button
                size="lg"
                onPress={handleSignup}
                isDisabled={authStore.isLoading || !email || !password}
                bg="$primary500"
                borderRadius="$lg"
              >
                <ButtonText>Create Account</ButtonText>
              </Button>

              <HStack space="sm" justifyContent="center">
                <Text size="sm" color="$textLight400">
                  Already have an account?
                </Text>
                <Pressable onPress={() => router.push('/(auth)/login')}>
                  <Text size="sm" color="$primary500" fontWeight="$medium">
                    Sign In
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
});

export default SignupScreen; 