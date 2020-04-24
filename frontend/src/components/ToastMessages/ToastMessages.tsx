import React, { useCallback } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, ToastMessage } from './ToastMessages.styles';
import { ToastProps, useToast } from '../../hooks/ToastContext';

interface ToastMessagesContainer {
  messages: ToastProps[];
}

const ToastMessages: React.FC<ToastMessagesContainer> = ({ messages }) => {
  const { removeToast } = useToast();

  const handleToastRemoval = useCallback(
    (id: string) => {
      removeToast(id);
    },
    [removeToast],
  );

  return (
    <Container>
      {messages.map(toast => (
        <ToastMessage
          key={toast.id}
          type={toast.type}
          hasDescription={!!toast.description}
        >
          <FiAlertCircle size={20} />
          <div>
            <strong>{toast.title}</strong>
            <p>{toast.description}</p>
          </div>
          <button
            type="button"
            onClick={() => handleToastRemoval(toast.id || '')}
          >
            <FiXCircle size={18} />
          </button>
        </ToastMessage>
      ))}
    </Container>
  );
};

export default ToastMessages;
