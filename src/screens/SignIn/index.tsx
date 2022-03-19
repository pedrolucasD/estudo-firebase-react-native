import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log("PASSOU NO USER", user)
  }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => Alert.alert('Usuário criado com sucesso!'))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Este e-mail já está sendo utilizado.');
        }

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Email inválido.');
        }

        if (error.code === 'auth/weak-password') {
          return Alert.alert('A senha deve ter 6 dígitos ou mais.');
        }
      })
  }

  function handleSignInWithEmailAndPassword() {
    auth().signInWithEmailAndPassword(email, pass)
      .then(({ user }) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error.code)

        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          return Alert.alert('Usuário e/ou senha incorretos.');
        }
      })
  }

  function handleForgotPassword(){
    auth().sendPasswordResetEmail(email)
    .then(() => Alert.alert('Enviamos um link de redefinição para seu e-mail.'))
  }



  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPass}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}