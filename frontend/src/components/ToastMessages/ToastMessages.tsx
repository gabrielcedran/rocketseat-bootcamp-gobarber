import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './ToastMessages.styles';
import { ToastProps } from '../../hooks/ToastContext';
import ToastMessage from './ToastMessage/ToastMessage';

interface ToastMessagesContainer {
  messages: ToastProps[];
}

const ToastMessages: React.FC<ToastMessagesContainer> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0, transform: 'rotateX(0deg)' },
      enter: { right: '0%', opacity: 1, transform: 'rotateX(360deg)' },
      leave: { right: '-120%', opacity: 0, transform: 'rotateX(0deg)' },
    },
  );
  return (
    <Container>
      {messagesWithTransition.map(({ item, key, props }) => (
        <ToastMessage key={key} toast={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastMessages;
