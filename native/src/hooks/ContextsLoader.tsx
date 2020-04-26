import React from 'react';
import { AuthProvider } from './AuthContext';

const ContextsLoader: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default ContextsLoader;
