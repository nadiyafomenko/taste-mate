import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/contexts/RootStoreContext';
import { router } from 'expo-router';
import {
  Box,
  VStack,
  Text,
  Button,
  ButtonText,
  Avatar,
  AvatarFallbackText,
  Divider,
  HStack,
} from '@gluestack-ui/themed';

const ProfileScreen = observer(() => {
  const { authStore } = useStores();

  const handleLogout = async () => {
    try {
      await authStore.logout();
      router.replace('/login');
    } catch (error) {
      // Error handled silently
    }
  };

  return (
    <Box flex={1} bg="$backgroundLight0" p="$4">
      <VStack space="md" alignItems="center" mt="$4" flex={1}>
        <Avatar size="2xl" bg="$primary500">
          <AvatarFallbackText>
            {authStore.user?.name || authStore.user?.email || 'User'}
          </AvatarFallbackText>
        </Avatar>

        <VStack space="xs" alignItems="center" mb="$4">
          <Text size="xl" bold>
            {authStore.user?.name || 'User Name'}
          </Text>
          <Text size="sm" color="$textLight500">
            {authStore.user?.email || 'email@example.com'}
          </Text>
        </VStack>

        <Divider my="$2" />

        <VStack space="md" w="$full">
          <HStack justifyContent="space-between" alignItems="center">
            <Text size="md">Account Settings</Text>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center">
            <Text size="md">Notifications</Text>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center">
            <Text size="md">Privacy</Text>
          </HStack>
        </VStack>

        <Box flex={1} w="$full" justifyContent="flex-end" pb="$4">
          <Button
            size="lg"
            variant="solid"
            bg="$error600"
            onPress={handleLogout}
          >
            <ButtonText>Logout</ButtonText>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
});

export default ProfileScreen;
