import React from 'react';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native';
import {
  Box,
  VStack,
  Text,
  Button,
  ButtonText,
  Heading,
} from '@gluestack-ui/themed';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Box flex={1} px="$6" justifyContent="center">
        <VStack space="3xl" w="$full" maxWidth="$96">
          <VStack space="md" alignItems="flex-start">
            <Heading size="2xl">
            Готуєш одне й те саме? Знову гречка? 😅
            </Heading>
            <Text
              size="lg"
              color="$textLight500"
            >
              Taste Mate врятує ситуацію! 🦸‍♂️🥘
            </Text>
          </VStack>

          <VStack space="md" w="$full">
            <Button
              size="lg"
              onPress={() => router.push('/(auth)/login')}
              bg="$primary500"
              w="$full"
            >
              <ButtonText>Я тут не вперше 🍲</ButtonText>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onPress={() => router.push('/(auth)/signup')}
              borderColor="$primary500"
              w="$full"
            >
              <ButtonText color="$primary500">Зареєструватися 🍴</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
} 