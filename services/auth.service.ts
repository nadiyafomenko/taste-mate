// src/services/auth.service.ts
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_AUDIENCE, API_URL } = Constants.expoConfig?.extra || {};

const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT_ID });

export interface IUser {
  name: string;
  email: string;
}

const ACCESS_TOKEN_KEY = 'accessToken';

const login = async (email: string, password: string): Promise<string> => {
  const res = await auth0.auth.passwordRealm({
    username: email,
    password,
    audience: AUTH0_CLIENT_AUDIENCE,
    realm: 'Username-Password-Authentication',
    scope: 'openid profile email',
  });

  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
  return res.accessToken;
};

const signup = async (email: string, password: string): Promise<void> => {
  await auth0.auth.createUser({
    email,
    password,
    connection: 'Username-Password-Authentication',
  });
};

const getStoredToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
};

const getProfile = async (token: string): Promise<IUser> => {
  const profile = await auth0.auth.userInfo({ token });
  return { name: profile.name as string, email: profile.email as string };
};

const authService = {
  login,
  signup,
  logout,
  getStoredToken,
  getProfile,
};

export default authService;