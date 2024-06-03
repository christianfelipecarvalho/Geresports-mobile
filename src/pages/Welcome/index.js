import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <View style={styles.containerImagem}>
        <Animatable.Image 
        animation="flipInY"
        source={require('../../assets/Geresportes-sem-fundo.png')}
        style={{width: 550, height:550}}
        resizeMode='contain'
        />
      </View>
      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.titulo}>Faça gestão de seus atletas em qualquer lugar!</Text>
        <Text style={styles.texto}>Faça login para começar</Text>
        
        <TouchableOpacity 
        style={styles.botao} 
        onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoBotao}>Acessar</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImagem: {
    flex: 2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25, 
    paddingStart: '5%',
    paddingEnd: '10%',
   
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 28,
    marginBottom: 12,
  },
  texto: {
    color: '#a1a1a1',
  },
  botao: {
    position: 'absolute',
    backgroundColor: '#41a56d',
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 12,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});