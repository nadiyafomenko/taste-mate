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
  Pressable,
  Icon,
  Center,
} from '@gluestack-ui/themed';
import { ChevronRightIcon } from '@gluestack-ui/themed';

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

  const menuItems = [
    { title: 'Account Settings', onPress: () => {} },
    { title: 'Notifications', onPress: () => {} },
    { title: 'Privacy', onPress: () => {} },
    { title: 'Help & Support', onPress: () => {} },
  ];

  return (
    <Box flex={1} bg="$backgroundLight0">
      <Center px="$6" pt="$8" pb="$6">
        <Avatar size="2xl" bg="$primary500">
          <AvatarFallbackText>
            {authStore.user?.name || authStore.user?.email || 'User'}
          </AvatarFallbackText>
        </Avatar>

        <VStack space="xs" alignItems="center" mt="$4">
          <Text size="xl" fontWeight="$bold">
            {authStore.user?.name || 'User Name'}
          </Text>
          <Text size="sm" color="$textLight500">
            {authStore.user?.email || 'email@example.com'}
          </Text>
        </VStack>
      </Center>

      <VStack space="md" p="$6">
        {menuItems.map((item, index) => (
          <Pressable
            key={item.title}
            onPress={item.onPress}
          >
            <HStack
              bg="$white"
              p="$4"
              borderRadius="$lg"
              borderColor="$borderLight100"
              borderWidth={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text size="md" fontWeight="$medium">{item.title}</Text>
              <Icon as={ChevronRightIcon} color="$textLight400" />
            </HStack>
          </Pressable>
        ))}

        <Box pt="$4">
          <Button
            size="lg"
            variant="outline"
            action="negative"
            borderRadius="$lg"
            onPress={handleLogout}
          >
            <ButtonText>Sign Out</ButtonText>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
});

export default ProfileScreen;
