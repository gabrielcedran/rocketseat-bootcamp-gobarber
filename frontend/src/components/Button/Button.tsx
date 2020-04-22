import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './Button.style';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
