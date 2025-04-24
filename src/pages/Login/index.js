import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { API_URL } from '../../services/LoginService';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const handleLogin = async () => {
    setLoading(true); // Inicia o indicador de carregamento
    try {
      const response = await fetch(`${API_URL}/Login/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      });

      if (response.status === 200) {
        const responseJson = await response.json();
        await AsyncStorage.setItem('@auth_token', responseJson.token);
        navigation.navigate('UsuarioLogadoTabs');
      } else {
        console.log('Erro ao fazer login:', response.status);
        // Tratar erro de login aqui, se necessário
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false); // Finaliza o indicador de carregamento
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-Vindo(a)</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerForm}>
        <Text style={styles.titulo}>Email</Text>
        <TextInput 
          placeholder="Digite um email..." 
          style={styles.input}
          onChangeText={text => setEmail(text)} 
        />
        
        <Text style={styles.titulo}>Senha</Text>
        <TextInput 
          placeholder="Sua senha..." 
          style={styles.input}
          onChangeText={text => setSenha(text)} 
          secureTextEntry={true} 
        />

        <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>Acessar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEsqueceuSenha} onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.textoBotaoEsqueceuSenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#41a56d',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '10%',
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
    fontWeight: 'bold',
  },
  botaoEsqueceuSenha: {
    alignSelf: 'center',
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 12,
    width: '60%',
    justifyContent: 'center',
  },
  textoBotaoEsqueceuSenha: {
    color: '#a1a1a1',
  },
});
