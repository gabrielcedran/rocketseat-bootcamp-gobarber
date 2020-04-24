import React from 'react';
import { Container } from './ToastMessages.styles';
import { ToastProps } from '../../hooks/ToastContext';
import ToastMessage from './ToastMessage/ToastMessage';

interface ToastMessagesContainer {
  messages: ToastProps[];
}

const ToastMessages: React.FC<ToastMessagesContainer> = ({ messages }) => {
  return (
    <Container>
      {messages.map(toast => (
        <ToastMessage key={toast.id} toast={toast} />
      ))}
    </Container>
  );
};

export default ToastMessages;
