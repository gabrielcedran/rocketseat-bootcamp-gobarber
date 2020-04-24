import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';
import { Container } from './ToastMessage.styles';
import { ToastProps, useToast } from '../../../hooks/ToastContext';

const ToastMessage: React.FC<{ toast: ToastProps }> = ({ toast }) => {
  const { removeToast } = useToast();

  const icons = {
    error: <FiXCircle size={20} />,
    success: <FiCheckCircle size={20} />,
    info: <FiInfo size={20} />,
  };

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 3000);

    // When a function is returned in a useEffect hook, that function is called when that component is disassembled (or destroyed).
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);
  return (
    <Container type={toast.type} hasDescription={!!toast.description}>
      <FiAlertCircle size={20} />
      <div>
        <strong>{toast.title}</strong>
        <p>{toast.description}</p>
      </div>
      <button type="button" onClick={() => removeToast(toast.id || '')}>
        {icons[toast.type || 'success']}
      </button>
    </Container>
  );
};

export default ToastMessage;
