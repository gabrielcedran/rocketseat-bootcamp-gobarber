import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './SignIn.styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => (
  <Container>
    <Image source={logoImg} />
    <Title>Faça o seu login</Title>
    <Input name="email" icon="mail" placeholder="E-mail" />
    <Input name="password" icon="lock" placeholder="Senha" />
    <Button
      onPress={() => {
        console.log('Teste');
      }}
    >
      Entrar
    </Button>
  </Container>
);

export default SignIn;
