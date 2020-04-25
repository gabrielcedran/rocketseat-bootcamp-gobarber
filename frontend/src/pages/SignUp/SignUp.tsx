import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Content,
  Background,
  AnimationContainer,
} from './SignUp.styles';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import goBarberApi from '../../services/goBarberApi';
import { useToast } from '../../hooks/ToastContext';

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  // React's way of accessing dom/react elements directly
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo dígitos.'),
        });
        await schema.validate(data, { abortEarly: false });

        await goBarberApi.post('/users', data);
        addToast({
          title: 'Cadastro realizado',
          description: 'Você já pode fazer o seu logon.',
          type: 'success',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // set the errors in the form so that the elements can access them
          formRef.current?.setErrors(getValidationErrors(err));
        } else {
          addToast({
            title: 'Erro ao realizar cadastro',
            description: 'Por favor tente novamente',
            type: 'error',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Go Barber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça o seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
