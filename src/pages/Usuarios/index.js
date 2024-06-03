import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import ImagemPadrao from '../../assets/ImagemPadrao.jpg';
import { API_URL } from '../../services/LoginService';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      // Recupera o token do AsyncStorage
      const token = await AsyncStorage.getItem('@auth_token');
        console.log('Token -> ' +token)
      const response = await fetch(`${API_URL}/usuario/listarTodosUsuarios/16`, {
        headers: {
          'Content-Type': 'application/json',
          // Inclui o token no cabeçalho Authorization
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };
  

  const UsuarioCard = ({ usuario }) => (
    <View style={{ borderWidth: 1, margin: 10, padding: 10 }}>
      {/* <Image  source={usuario.imagemPerfilBase64 ? `data:image/jpeg;base64,${usuario.imagemPerfilBase64}` : ImagemPadrao} style={{ width: 100, height: 100 }} /> */}
      <Image  source={ImagemPadrao} style={{ width: 100, height: 100 }} />
      <Text>Nome: {usuario.nome}</Text>
      <Text>Email: {usuario.email}</Text>
      <Text>Categoria: {usuario.categoria}</Text>
      <Text>Modalidade: {usuario.modalidade}</Text>
    </View>
  );

  return (
    <View>
      <Text>Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UsuarioCard usuario={item} />}
      />
    </View>
  );
}
