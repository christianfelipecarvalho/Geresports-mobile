import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { default as React, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagemPadrao from '../../assets/ImagemPadrao.jpg';
import { API_URL } from '../../services/LoginService';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );

  const fetchUsuarios = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      const response = await fetch(`${API_URL}/usuario/listarTodosUsuarios/16`, {
        headers: {
          'Content-Type': 'application/json',
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
    } finally {
      setLoading(false); // Marca o carregamento como concluído
    }
  };

  const adicionarNovoUsuario = () => {
    navigation.navigate('NovoUsuario');
  };

  const hanleClickCard = (usuario) => {
    console.log('Card pressionado -> ' + usuario.nome);
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
          <Text>Categoria: {usuario.categoria}</Text>
          <Text>Modalidade: {usuario.modalidade}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#41a56d" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.botaoAdicionarNovo} onPress={adicionarNovoUsuario}>
        <Text style={styles.textoBotaoAdicionarNovo}> + </Text>
      </TouchableOpacity>
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
  botaoAdicionarNovo: {
    backgroundColor: '#41a56d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    width: 60,
    height: 60,
    borderRadius: 50,
    left: 280,
    bottom: 30,
  },
  textoBotaoAdicionarNovo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
