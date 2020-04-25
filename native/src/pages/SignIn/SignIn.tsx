import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './SignIn.styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => (
  <>
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
      <ForgotPassword
        onPress={() => {
          console.log('forgot password!');
        }}
      >
        <ForgotPasswordText>Esqueci a minha senha</ForgotPasswordText>
      </ForgotPassword>
    </Container>
    <CreateAccount
      onPress={() => {
        console.log('create account!');
      }}
    >
      <Icon name="log-in" size={20} color="#ff9000" />
      <CreateAccountText>Criar uma conta</CreateAccountText>
    </CreateAccount>
  </>
);

export default SignIn;
