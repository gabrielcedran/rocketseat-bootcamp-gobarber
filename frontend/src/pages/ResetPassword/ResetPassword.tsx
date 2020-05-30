import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Container,
  Content,
  Background,
  AnimationContainer,
} from './ResetPassword.styles';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/ToastContext';

import logo from '../../assets/logo.svg';
import goBarberApi from '../../services/goBarberApi';

interface ResetPasswordData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Nova Senha obrigatória'),
          passwordConfirmation: Yup.string()
            .required('Confirmaçāo da senha obrigatória')
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmaçāo de senha nāo coincide.',
            ),
        });

        await schema.validate(data, { abortEarly: false });

        const token = new URLSearchParams(location.search).get('token');

        await goBarberApi.post('/password/reset', {
          password: data.password,
          token,
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        } else {
          addToast({
            title: 'Erro ao resetar sua senha',
            description:
              'Ocorreu um erro ao resetar sua senha, tente novamente.',
            type: 'error',
          });
        }
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Go Barber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova senha"
            />
            <Input
              icon={FiLock}
              name="passwordConfirmation"
              type="password"
              placeholder="Confirmaçāo da senha"
            />
            <Button type="submit">Alterar minha senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
