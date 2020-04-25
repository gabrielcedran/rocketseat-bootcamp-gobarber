import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  ReturnLogin,
  ReturnLoginText,
} from './SignUp.styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import logo from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
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
            <Input name="name" icon="users" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Button>Cadastrar</Button>
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
