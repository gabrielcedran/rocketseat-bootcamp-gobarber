import React, { createContext, useCallback } from 'react';
import goBarberApi from '../services/goBarberApi';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name?: string;
  signIn(credentials: SignInCredentials): Promise<void>;
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
  const signIn = useCallback(async ({ email, password }) => {
    const response = await goBarberApi.post('/sessions', { email, password });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
};
