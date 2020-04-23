import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background } from './SignIn.styles';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { AuthContext } from '../../contexts/AuthContext';

import logo from '../../assets/logo.svg';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Email inválido.'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });
        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        formRef.current?.setErrors(getValidationErrors(err));
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Go Barber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça o seu logon</h1>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="/forgot">Esqueci minha senha</a>
        </Form>

        <a href="signup">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
