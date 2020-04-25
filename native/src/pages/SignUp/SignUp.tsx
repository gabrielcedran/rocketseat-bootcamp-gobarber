import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  Container,
  Title,
  ReturnLogin,
  ReturnLoginText,
} from './SignUp.styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import logo from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';
import goBarberApi from '../../services/goBarberApi';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const emaildRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        password: Yup.string()
          .required('Senha Obrigatória')
          .min(6, 'Senha deve ter no mínimo 6 characteres'),
      });

      await schema.validate(data, { abortEarly: false });
      await goBarberApi.post('/users', data);

      Alert.alert(
        'Cadastro realizado com sucesso',
        'Você já pode fazer login na aplicação.',
      );
      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(err));
      } else {
        Alert.alert(
          'Erro ao realizar cadastro',
          'Ocorreu um erro ao realizar o cadastro, por favor cheque os dados',
        );
      }
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="users"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emaildRef.current?.focus();
                }}
              />
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
                ref={emaildRef}
              />
              <Input
                secureTextEntry
                name="password"
                icon="lock"
                ref={passwordRef}
                placeholder="Senha"
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <ReturnLogin onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" style={{ color: '#f4ede8' }} size={16} />
        <ReturnLoginText>Voltar para logon</ReturnLoginText>
      </ReturnLogin>
    </>
  );
};

export default SignUp;
