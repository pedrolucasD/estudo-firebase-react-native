import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'

import { styles } from './styles';
import { Product, ProductProps } from '../Product';


export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
    const subscribe = firestore()
    .collection('products')
    .orderBy('description', 'asc')
    .onSnapshot(querySnapshot => {
       const data = querySnapshot.docs.map((doc) => {
         return {
           id: doc.id,
           ...doc.data()
         }
       }) as ProductProps[];

       setProducts(data);
    });

    return () => subscribe()
  },[])

  // BUSCA TODOS OS REGISTROS ATUALIZANDO EM TEMPO REAL COM INTERVALO (OBRIGATÓRIO orderBy)
  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .orderBy('quantity')
  //   .startAt(1) // ou startAfter() -> começa a contar após o valor, ou seja, 2
  //   .endAt(6) // ou endBefore() -> começa a contar antes do valor, ou seja, 5
  //   .onSnapshot(querySnapshot => {
  //      const data = querySnapshot.docs.map((doc) => {
  //        return {
  //          id: doc.id,
  //          ...doc.data()
  //        }
  //      }) as ProductProps[];

  //      setProducts(data);
  //   });

  //   return () => subscribe()
  // },[])

  // BUSCA TODOS OS REGISTROS ATUALIZANDO EM TEMPO REAL COM ORDENAÇÃO
  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .orderBy('description', 'asc')
  //   .onSnapshot(querySnapshot => {
  //      const data = querySnapshot.docs.map((doc) => {
  //        return {
  //          id: doc.id,
  //          ...doc.data()
  //        }
  //      }) as ProductProps[];

  //      setProducts(data);
  //   });

  //   return () => subscribe()
  // },[])

  // BUSCA TODOS OS REGISTROS ATUALIZANDO EM TEMPO REAL COM LIMITE
  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .limit(10)
  //   .onSnapshot(querySnapshot => {
  //      const data = querySnapshot.docs.map((doc) => {
  //        return {
  //          id: doc.id,
  //          ...doc.data()
  //        }
  //      }) as ProductProps[];

  //      setProducts(data);
  //   });

  //   return () => subscribe()
  // },[])

  // BUSCA TODOS OS REGISTROS ATUALIZANDO EM TEMPO REAL COM FILTRO
  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .where('quantity', '==', 1)
  //   .onSnapshot(querySnapshot => {
  //      const data = querySnapshot.docs.map((doc) => {
  //        return {
  //          id: doc.id,
  //          ...doc.data()
  //        }
  //      }) as ProductProps[];

  //      setProducts(data);
  //   });

  //   return () => subscribe()
  // },[])

  // BUSCA TODOS OS REGISTROS ATUALIZANDO EM TEMPO REAL  
  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .onSnapshot(querySnapshot => {
  //      const data = querySnapshot.docs.map((doc) => {
  //        return {
  //          id: doc.id,
  //          ...doc.data()
  //        }
  //      }) as ProductProps[];
  //      setProducts(data);
  //   });
  //   return () => subscribe()
  // },[])

  // BUSCA TODOS OSREGISTROS UMA ÚNICA VEZ
  // useEffect(() => {
  //   firestore()
  //   .collection('products')
  //   .get()
  //   .then(response => {
  //     const data = response.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //     }) as ProductProps[]
  //     setProducts(data)
  //   })
  //   .catch(error => console.log(error))
  // },[])

  // BUSCA UM REGISTRO PELO ID UMA ÚNICA VEZ
  // useEffect(() => {
  //   firestore()
  //   .collection('products')
  //   .doc('da310a98-a961-421a-802d-9336305a602e')
  //   .get()
  //   .then(response => {
  //     console.log({
  //       id: response.id,
  //       ...response.data()
  //     })
  //   })
  //   .catch(error => console.log())
  // },[])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
