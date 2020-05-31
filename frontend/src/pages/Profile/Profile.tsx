import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiUser, FiLock, FiMail, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useHistory, Link } from 'react-router-dom';
import { Container, Content, AvatarInput } from './Profile.styles';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import goBarberApi from '../../services/goBarberApi';
import { useToast } from '../../hooks/ToastContext';
import { useAuth } from '../../hooks/AuthContext';

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  // React's way of accessing dom/react elements directly
  const formRef = useRef<FormHandles>(null);
  const { user, updateUser } = useAuth();

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

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);
        goBarberApi.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado',
            description: '',
          });
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user?.name, email: user?.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user?.avatarUrl} alt={user?.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="Email" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova Senha"
          />
          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar Senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
