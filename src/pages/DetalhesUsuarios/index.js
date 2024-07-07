import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  ScrollView, StyleSheet,
  Switch,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import ImagemPadrao from '../../assets/ImagemPadrao.jpg';

export default function DetalhesUsuario({route}) {
  const [value, setValue] = useState(0);
  const [openFileEdit, setOpenFileEdit] = useState(false);
  const [fileName, setFileName] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState(false);
  const [genero, setGenero] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const navigation = useNavigation();
  // const { usuario } = route.params;
  const [formulario, setFormulario] = useState(route.params ? route.params.usuario : {});
  
  

  const handleFileChange = (event) => {
    // colocar file aqui
  };

  const handleCheckBoxImagemPerfil = () => {
    setImagemPerfil(!imagemPerfil);
  };

  const handleSave = () => {
    // colocar logica do save
  };

  const handleMostrarDocumento = (documento, event) => {
    // logica do documento
  };

  const handleExcluirDocumento = (documento, event) => {
    // exclusao do documento aqui
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleChangeTab = (index) => {
    setValue(index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <Button title="Dados Pessoais" onPress={() => handleChangeTab(0)} />
        <Button title="Dados Profissionais" onPress={() => handleChangeTab(1)} />
        <Button title="Documentos" onPress={() => handleChangeTab(2)} />
      </View>
      {value === 0 && (
        <View style={styles.camposContainer}>
      <View style={styles.containerHeader}>
        <Image
          source={
            formulario.usuario?.imagemPerfilBase64
              ? { uri: `data:image/jpeg;base64,${formulario.usuario.imagemPerfilBase64}` }
              : ImagemPadrao
          }
          style={styles.imagem}
        />
      </View>
          <Text style={styles.titulo}>Nome</Text>
          <TextInput
            placeholder="Digite um nome..."
            style={styles.input}
            value={formulario.usuario ? formulario.usuario.nome :  ''}
            onChangeText={text => setFormulario({ ...formulario, usuario: { ...formulario.usuario, nome: text } })}
          />
          <Text style={styles.titulo}>Genero</Text>
          <Picker
            selectedValue={genero}
            onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
          >
            {Object.values(generoMap).map((genero, index) => (
              <Picker.Item key={index} label={genero} value={genero} />
            ))}
          </Picker>
          <Text style={styles.titulo}>Data de Nascimento</Text>
          <TextInput
            placeholder="Digite a data de nascimento..."
            style={styles.input}
            value={formulario.usuario ? formulario.usuario.dataNascimento : ''}
            onChangeText={text => setFormulario({ ...formulario, usuario: { ...formulario.usuario, dataNascimento: text } })}
          />
          <Text style={styles.titulo}>Telefone</Text>
          <TextInput
            placeholder="Digite um telefone..."
            style={styles.input}
            value={formulario.usuario ? formulario.usuario.telefone : ''}
            onChangeText={text => setFormulario({ ...formulario, usuario: { ...formulario.usuario, telefone: text } })}
          />
          <Text style={styles.titulo}>CPF</Text>
          <TextInput
            placeholder="Digite o CPF..."
            style={styles.input}
            value={formulario.usuario ? formulario.usuario.cpfRg : ''}
            onChangeText={text => setFormulario({ ...formulario, usuario: { ...formulario.usuario, cpfRg: text } })}
          />
          <Text style={styles.titulo}>E-mail</Text>
          <TextInput
            placeholder="Digite um e-mail..."
            style={styles.input}
            value={formulario.usuario ? formulario.usuario.email : ''}
            onChangeText={text => setFormulario({ ...formulario, usuario: { ...formulario.usuario, email: text } })}
          />
        </View>
      )}
      {value === 1 && (
        <View style={styles.camposContainer}>
          <Text style={styles.titulo}>Cargo</Text>
          <TextInput
            placeholder="Digite o cargo..."
            style={styles.input}
            value={formulario.usuario ? formulario.usuario.cargo : ''}
            onChangeText={text => setFormulario({ ...formulario, usuario: { ...formulario.usuario, cargo: text } })}
          />
          <Text style={styles.titulo}>CREF</Text>
          <TextInput
            placeholder="Digite o CREF..."
            style={styles.input}
            value={formulario.usuario ? formulario.usuario.cref : ''}
            onChangeText={text => setFormulario({ ...formulario, usuario: { ...formulario.usuario, cref: text } })}
          />
          <Text style={styles.titulo}>Federação</Text>
          <TextInput
            placeholder="Digite a federação..."
            style={styles.input}
            value={formulario.usuario ? formulario.usuario.federacao : ''}
            onChangeText={text => setFormulario({ ...formulario, usuario: { ...formulario.usuario, federacao: text } })}
          />
          <Text style={styles.titulo}>Categoria</Text>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
          >
            {Object.values(categoriaMap).map((categoria, index) => (
              <Picker.Item key={index} label={categoria} value={categoria} />
            ))}
          </Picker>
          <Text style={styles.titulo}>Modalidade</Text>
          <Picker
            selectedValue={modalidade}
            onValueChange={(itemValue, itemIndex) => setModalidade(itemValue)}
          >
            {Object.values(modalidadeMap).map((modalidade, index) => (
              <Picker.Item key={index} label={modalidade} value={modalidade} />
            ))}
          </Picker>
          <Text style={styles.titulo}>Tipo de Usuário</Text>
          <Picker
            selectedValue={tipoUsuario}
            onValueChange={(itemValue, itemIndex) => setTipoUsuario(itemValue)}
          >
            <Picker.Item label="ADMINISTRADOR" value="ADMINISTRADOR" />
            <Picker.Item label="TECNICO" value="TECNICO" />
            <Picker.Item label="ATLETA" value="ATLETA" />
          </Picker>
          {(tipoUsuario === 'TECNICO' || tipoUsuario === 'ADMINISTRADOR') && (
            <View>
              <Text style={styles.titulo}>Time</Text>
              <Picker
                selectedValue={time}
                onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
              >
                {Object.values(timeMap).map((time, index) => (
                  <Picker.Item key={index} label={time} value={time} />
                ))}
              </Picker>
            </View>
          )}
        </View>
      )}
      {value === 2 && (
        <View style={styles.camposContainer}>
          <View style={{ flexDirection: 'row', margin: 15 }}>
            <Text>Anexar novo: </Text>
            <TouchableOpacity onPress={() => setOpenFileEdit(true)}>
              <Text>Attach File</Text>
            </TouchableOpacity>
          </View>
          <Text>Arquivos: </Text>
          {formulario.usuario && formulario.usuario.documentoUsuario.length > 0 ? (
            <FlatList
              data={formulario.usuario.documentoUsuario}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                  <Text>{item.nomeDocumento}</Text>
                  <Text>{item.imagemPerfil ? 'Sim' : 'Não'}</Text>
                  <TouchableOpacity onPress={(event) => handleMostrarDocumento(item, event)}>
                    <Text>Mostrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(event) => handleExcluirDocumento(item, event)}>
                    <Text>Excluir</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <Text>Nenhum arquivo salvo.</Text>
          )}
          <Modal visible={openFileEdit} onRequestClose={() => setOpenFileEdit(false)}>
            <View style={styles.modalContainer}>
              <Text>Upload File</Text>
              <Button title="Anexar arquivos" onPress={handleFileChange} />
              <TextInput
                placeholder="Nome Arquivo"
                style={styles.input}
                value={fileName}
                onChangeText={text => setFileName(text)}
                editable={false}
              />
              <View style={styles.switchContainer}>
                <Switch
                  value={imagemPerfil}
                  onValueChange={handleCheckBoxImagemPerfil}
                />
                <Text>Imagem de Perfil</Text>
              </View>
              <Button title="Salvar" onPress={handleSave} />
              <Button title="Cancelar" onPress={() => setOpenFileEdit(false)} />
            </View>
          </Modal>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleSave}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleClose}>
          <Text style={styles.textoBotao}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  camposContainer: {
    marginVertical: 20,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  botao: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#FFF',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const generoMap = {
  MASCULINO: 'Masculino',
  FEMININO: 'Feminino',
};

const categoriaMap = {
  CATEGORIA1: 'Categoria 1',
  CATEGORIA2: 'Categoria 2',
};

const modalidadeMap = {
  MODALIDADE1: 'Modalidade 1',
  MODALIDADE2: 'Modalidade 2',
};

const timeMap = {
  TIME1: 'Time 1',
  TIME2: 'Time 2',
};
