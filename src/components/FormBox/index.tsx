import React, { useState } from 'react';
import { Alert } from 'react-native';

import { Container } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';

import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export function FormBox() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  async function handleProductAdd(){
   firestore()
   .collection('products')
   .doc(String(uuid.v4()))
   .set({
     description,
     quantity,
     done: false,
     createdAt: firestore.FieldValue.serverTimestamp(),
   }) 
   .then(() => {
     Alert.alert('Produto adicionado com sucesso!')
   })
   .catch((error) => console.log(error))
  }


  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={value => setQuantity(Number(value))}
      />

      <ButtonIcon
        size='large'
        icon="add-shopping-cart"
        onPress={handleProductAdd}
      />
    </Container>
  );
}
