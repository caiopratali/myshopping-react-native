import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInAnonymously = async () => {
    const { user } = await auth().signInAnonymously();

    console.log(user)
  }

  const handleCreateUserAccount = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      Alert.alert('Usuário criado com sucesso!');
    } catch (error: any) {
      const createAccountError = {
        [error.code]: 'Ocorreu um erro desconhecido',
        'auth/email-already-in-use': 'That email address is already in use!',
        'auth/invalid-email': 'That email address is invalid!',
        'auth/weak-password': 'A senha precisa ter no minimo 6 digitos'
      }
      
      Alert.alert(createAccountError[error.code]);

      console.error(error);
    }
  }

  const handleForgoutPassword = async () => {
   try {
    await auth().sendPasswordResetEmail(email);

    Alert.alert('Acesso o seu e-mail para redefinir a senha.')
   } catch (error) {
     console.error(error);
   }
  }
  
  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        keyboardType="email-address"
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInAnonymously} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgoutPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}