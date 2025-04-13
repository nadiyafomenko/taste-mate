import React, { createContext, useContext, useEffect, useState } from 'react';
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID } = Constants.expoConfig?.extra || {};

const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT_ID });

interface IAuth0User {
  name: string;
  email: string;
}

interface IAuthContextType {
  user: IAuth0User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IAuth0User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const res = await auth0.auth.passwordRealm({
        username: email,
        password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email',
      });
  
      const profile = await auth0.auth.userInfo({ token: res.accessToken });
  
      setUser({ name: profile.name as string, email: profile.email as string });
      await AsyncStorage.setItem('accessToken', res.accessToken);
      setIsLoading(false);
    } catch (err: any) {  
      setIsLoading(false);
      if (err.message?.includes('user does not exist')) {
        throw new Error('User not found');
      }
  
      if (err.message?.includes('Wrong email or password')) {
        throw new Error('Invalid password');
      }
  
      throw err;
    }
  };
  

  const signup = async (email: string, password: string) => {
    try {
      await auth0.auth.createUser({
        email,
        password,
        connection: 'Username-Password-Authentication',
      });
      await login(email, password);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    setUser(null);
  };

  const restoreSession = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return;
  
      const profile = await auth0.auth.userInfo({ token });
      setUser({ name: profile.name as string, email: profile.email as string });
    } catch {
      await AsyncStorage.removeItem('accessToken');
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContextType => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');

  return context;
};
