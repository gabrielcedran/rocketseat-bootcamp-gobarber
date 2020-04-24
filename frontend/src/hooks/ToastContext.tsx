import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastMessages from '../components/ToastMessages/ToastMessages';

interface ToastContextData {
  addToast(content: Omit<ToastProps, 'id'>): void;
  removeToast(id: string): void;
  toasts: ToastProps[];
}

export interface ToastProps {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'error' | 'info';
}

const ToastContext = createContext({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(({ title, description, type }: ToastProps) => {
    setToasts(currentContent => [
      ...currentContent,
      { id: uuid(), title, description, type },
    ]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(currentConent =>
      [...currentConent].filter(toast => toast.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastMessages messages={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be use within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
