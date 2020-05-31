import React, { createContext, useCallback, useState, useContext } from 'react';
import goBarberApi from '../services/goBarberApi';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user?: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface AuthState {
  token: string;
  user: User;
}

interface User {
  avatarUrl: string;
  name: string;
  id: string;
  email: string;
}

// In order to centrilize the login function, inside the context being created, provide the login method
// The signIn component will call it once the sign in form is submitted.
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

// Every subcomponent which should have access to the authentication data must be wrapped by the Context Provider.
// Instead of creating it arbitrary on the highest component, isolate it in a specialized component and simple use it where it
// has to be used.
export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');
    if (token && user) {
      goBarberApi.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await goBarberApi.post('/sessions', { email, password });

    const { token, user } = response.data;
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    goBarberApi.defaults.headers.authorization = `Bearer ${token}`;

    setAuthData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setAuthData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (updatedData: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(updatedData));
      setAuthData({
        token: authData.token,
        user: {
          ...updatedData,
        },
      });
    },
    [setAuthData, authData.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
