import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, ToastMessage } from './ToastMessages.styles';
import { useToast } from '../../hooks/ToastContext';

const ToastMessages: React.FC = () => {
  const { toasts, removeToast } = useToast();

  function handleToastRemoval(id: string): void {
    removeToast(id);
  }

  return (
    <Container>
      {toasts.map(toast => (
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
