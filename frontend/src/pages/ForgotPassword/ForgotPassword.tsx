import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import {
  Container,
  Content,
  Background,
  AnimationContainer,
} from './ForgotPassword.styles';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button/Button';
import goBarberApi from '../../services/goBarberApi';
import Input from '../../components/Input/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/ToastContext';

const ForgotPassword: React.FC = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  // React's way of accessing dom/react elements directly
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, { abortEarly: false });

        await goBarberApi.post('/password/forgot', data);
        addToast({
          title: 'Email de recuperaçāo enviado.',
          description: 'Você já pode recuperar a sua senha.',
          type: 'success',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // set the errors in the form so that the elements can access them
          formRef.current?.setErrors(getValidationErrors(err));
        } else {
          addToast({
            title: 'Erro enviar e-mail de recuperaçāo',
            description: 'Por favor tente novamente',
            type: 'error',
          });
        }
      } finally {
        setLoading(false);
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
            <h1>Recuperar Senha</h1>
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Button loading={loading} type="submit">Recuperar</Button>
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

export default ForgotPassword;
