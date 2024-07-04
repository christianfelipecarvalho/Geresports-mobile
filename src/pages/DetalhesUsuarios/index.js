import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import ImagemPadrao from '../../assets/ImagemPadrao.jpg';

export default function DetalhesUsuario() {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Image
          source={
            ImagemPadrao
          }
          style={styles.imagem}
        />
      </View>
      <Text style={styles.titulo}>Nome</Text>
      <TextInput
        placeholder="Digite um nome..."
        style={styles.input}
      // onChangeText={text => console.log("clicou no input 1")} 
      />

      <Text style={styles.titulo}>E-mail</Text>
      <TextInput
        placeholder="Digite um e-mail..."
        style={styles.input}
        // onChangeText={text => setSenha(text)} 
        secureTextEntry={true}
      />
      <Text style={styles.titulo}>Telefone</Text>
      <TextInput
        placeholder="Digite um telefone..."
        style={styles.input}
        // onChangeText={text => setSenha(text)} 
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.botao}
      // onPress={handleLogin}
      >
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    alignItems: 'center',
  },
  imagem: {
    width: 160,
    height: 160,
    borderRadius: 50,
  },
  message: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '10%',
    paddingEnd: '10%',

  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 45,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  botao: {
    marginTop: 30,
    backgroundColor: '#41a56d',
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 12,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },

});