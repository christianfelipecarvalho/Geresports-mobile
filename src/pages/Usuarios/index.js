import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { default as React, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagemPadrao from '../../assets/ImagemPadrao.jpg';
import { API_URL } from '../../services/LoginService';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      // Recupera o token do AsyncStorage
      const token = await AsyncStorage.getItem('@auth_token');
      console.log('Token -> ' + token);
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

  const hanleClickCard = (usuario) => {
    console.log('Card pressionado -> ' + usuario);
    navigation.navigate('DetalhesUsuario', { usuario }); 
  };

  const UsuarioCard = ({ usuario }) => (
    <TouchableOpacity onLongPress={() => hanleClickCard(usuario)}>
      <View style={styles.usuarioCard}>
        <Image
          source={
            usuario.imagemPerfilBase64
              ? { uri: `data:image/jpeg;base64,${usuario.imagemPerfilBase64}` }
              : ImagemPadrao
          }
          style={styles.imagem}
        />
        <View style={styles.dadosCard}>
          <Text>Nome: {usuario.nome}</Text>
          {/* <Text>Email: {usuario.email}</Text> */}
          <Text>Categoria: {usuario.categoria}</Text>
          <Text>Modalidade: {usuario.modalidade}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList 
        style={{ marginTop: 40 }}
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UsuarioCard usuario={item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  usuarioCard: {
    marginTop: 5,
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    height: 120,
    margin: 10,
  },
  dadosCard: {
    marginLeft: 10,
    marginTop: 15,
  },

  imagem: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },

});