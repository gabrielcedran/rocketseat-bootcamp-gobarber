import React from 'react';
import { Image, Text } from 'react-native';
import { Container } from './SignIn.styles';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => (
  <Container>
    <Text>SignIN</Text>
    <Image source={logoImg} />
  </Container>
);

export default SignIn;
