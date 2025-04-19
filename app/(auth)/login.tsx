import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/contexts/RootStoreContext';
import { SafeAreaView } from 'react-native';
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
  Icon,
} from '@gluestack-ui/themed';
import { EyeIcon, EyeOffIcon, ArrowLeftIcon } from '@gluestack-ui/themed';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Pressable
        onPress={() => router.back()}
        p="$4"
      >
        <Icon as={ArrowLeftIcon} size="lg" color="$textLight900" />
      </Pressable>
      <Box flex={1} px="$6">
        <VStack space="xl" w="$full" maxWidth="$96">
          <VStack space="xs" mb="$4" alignItems="flex-start">
            <Heading size="2xl">Привіт знову! 👋</Heading>
            <Text size="lg" color="$textLight500">
            Увійди та подивимось, що приготувати 🍴
            </Text>
          </VStack>

          <VStack space="lg" w="$full">
            <VStack space="xs">
              <Text color="$textLight500" size="sm">Email</Text>
              <Input
                size="lg"
                borderRadius="$lg"
                borderColor={email ? "$primary500" : "$borderLight200"}
              >
                <InputField
                  placeholder="example@gmail.com"
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
                  placeholder="********"
                  value={password}
                  onChangeText={setPassword}
                  type={showPassword ? "text" : "password"}
                />
                <InputSlot pr="$4" onPress={() => setShowPassword(!showPassword)}>
                  <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} color="$textLight400" />
                </InputSlot>
              </Input>
            </VStack>

            <Box alignItems="flex-end">
              <Pressable>
                <Text size="sm" color="$primary500" fontWeight="$medium">
                  Забув пароль?
                </Text>
              </Pressable>
            </Box>

            <VStack space="md" mt="$4">
              <Button
                size="lg"
                onPress={handleLogin}
                isDisabled={authStore.isLoading || !email || !password}
                bg="$primary500"
                borderRadius="$lg"
                w="$full"
              >
                <ButtonText>Увійти</ButtonText>
              </Button>

              <HStack space="sm" justifyContent="center">
                <Text size="sm" color="$textLight400">
                Новенький тут?
                </Text>
                <Pressable onPress={() => router.push('/(auth)/signup')}>
                  <Text size="sm" color="$primary500" fontWeight="$medium">
                  Зареєструйся 🍽️
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
});

export default LoginScreen;
