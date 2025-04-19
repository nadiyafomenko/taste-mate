import React from 'react';
import { Stack, router } from 'expo-router';
import {
  Box,
  VStack,
  Text,
  Button,
  ButtonText,
  Center,
  Heading,
} from '@gluestack-ui/themed';

export default function WelcomeScreen() {
  return (
    <Box flex={1} bg="$backgroundLight0">
      <Stack.Screen options={{ headerShown: false }} />
      <Center flex={1} px="$6">
        <VStack space="3xl" w="$full" maxWidth="$96">
          <VStack space="md" alignItems="center">
            <Heading size="2xl" textAlign="center">
              Welcome to TasteMate
            </Heading>
            <Text
              size="lg"
              textAlign="center"
              color="$textLight500"
              px="$4"
            >
              Discover and share your favorite recipes with food lovers around the world
            </Text>
          </VStack>

          <VStack space="md" w="$full">
            <Button
              size="lg"
              onPress={() => router.push('/(auth)/login')}
              bg="$primary500"
            >
              <ButtonText>Login</ButtonText>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onPress={() => router.push('/(auth)/signup')}
              borderColor="$primary500"
            >
              <ButtonText color="$primary500">Create Account</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
} 