import React, { createContext, useCallback, useState } from 'react';
import goBarberApi from '../services/goBarberApi';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user?: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthState {
  token: string;
  user: object;
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
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await goBarberApi.post('/sessions', { email, password });

    const { token, user } = response.data;
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setAuthData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: authData.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
