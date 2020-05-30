import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './Button.style';

// Exteding the properties of a external component so that react recognizes it as a valid property.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
