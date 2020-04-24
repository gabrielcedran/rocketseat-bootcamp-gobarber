import React from 'react';

import { ToastProvider } from './ToastContext';
import { AuthProvider } from './AuthContext';

const ContextsLoader: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default ContextsLoader;
