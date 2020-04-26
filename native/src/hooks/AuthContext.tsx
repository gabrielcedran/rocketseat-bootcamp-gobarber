import React, { createContext, useCallback, useContext, useState } from 'react';
import { Alert } from 'react-native';
import goBarberApi from '../services/goBarberApi';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user?: object;
  signIn(credentials: SignInCredentials): void;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>();

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await goBarberApi.post<AuthState>('/sessions', {
        email,
        password,
      });
      setAuthData(response.data);
    } catch (err) {
      Alert.alert(
        'Erro ao realizar login',
        'Por favor, verifique suas credenciais.',
      );
    }
  }, []);

  const signOut = useCallback(() => {
    setAuthData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: authData?.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'Auth context must be used within a AuthProvider component',
    );
  }
  return context;
};
