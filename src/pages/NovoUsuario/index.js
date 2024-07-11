import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ExelIcon from '../../assets/excel.png';
import PdfIcon from '../../assets/ficheiro-pdf.png';
import ImagemPadrao from '../../assets/ImagemPadrao.jpg';
import DocIcon from '../../assets/palavra.png';
import ImagemIcon from '../../assets/tipo.png';

const getDocumentoIcon = (nomeDocumento) => {
  const extension = nomeDocumento.split('.').pop().toLowerCase();
  switch (extension) {
    case 'doc':
    case 'docx':
      return DocIcon;
    case 'pdf':
      return PdfIcon;
    case 'xlsx':
      return ExelIcon;
    case 'jpg':
    case 'jpeg':
      return ImagemIcon;
    default:
      return null;
  }
};

const DocumentoItem = ({ item, onMostrarDocumento, onExcluirDocumento }) => {
  const documentoIcon = getDocumentoIcon(item.nomeDocumento);

  return (
    <View style={styles.documentoContainer}>
      <View style={styles.imagemNomeContainer}>
        {documentoIcon && <Image source={documentoIcon} style={styles.documentoIcon} />}
        <Text style={styles.documentoNome}>{item.nomeDocumento}</Text>
      </View>

      <TouchableOpacity style={styles.documentoAcaoBotao} onPress={() => onMostrarDocumento(item)}>
        <Text style={styles.documentoAcaoMostrarTexto}>Mostrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.documentoAcaoBotaoExcluir} onPress={() => onExcluirDocumento(item)}>
        <Text style={styles.documentoAcaoMostrarTexto}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};


export default function DetalhesUsuario({ route }) {
  const [value, setValue] = useState(0);
  const [openFileEdit, setOpenFileEdit] = useState(false);
  const [fileName, setFileName] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState(false);
  const [genero, setGenero] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();
  const [formulario, setFormulario] = useState(route && route.params ? route.params.usuario : {});
  const [dataNascimento, setDataNascimento] = useState(formulario ? moment(formulario.dataNascimento).toDate() : new Date());

  const handleFileChange = (event) => {
    // colocar file aqui
  };

  const handleCheckBoxImagemPerfil = () => {
    setImagemPerfil(!imagemPerfil);
  };
 const handleSaveDocumento  = async () => {
    const payload = {
      nomeDocumento: fileName,
      imagemPerfil: imagemPerfil,
      idUsuario: formulario.codigoUsuario,
    };
  };
 const handleSave = async () => {
  const payload = {
    codigoUsuario: formulario.id || 0,
    nome: formulario.nome || '',
    email: formulario.email || '',
    dataNascimento: formulario.dataNascimento || '',
    cargo: formulario.cargo || '',
    telefone: formulario.telefone || '',
    cref: formulario.cref || '',
    federacao: formulario.federacao || '',
    tipoUsuario: tipoUsuario || 1,
    categoria: categoria || 0,
    modalidade: modalidade || 0,
    time: 0,
    genero: genero || 0,
    cpfRg: formulario.cpfRg || '',
    ativo: true
  };

  const getAuthToken = async () => {
    const token = await AsyncStorage.getItem('@auth_token');
    return token;
  };

  try {
    const token = await getAuthToken();
    const response = await fetch('https://geresportes.azurewebsites.net/Usuario/AlterarUsuario/1', {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const textResponse = await response.text();
    console.log('Resposta:', response.status)
    if (response.status === 200) {
      let result;
      
      console.log('Usuário atualizado com sucesso:', result);
      navigation.goBack();
    } else {
      console.error('Erro ao atualizar usuário:', textResponse);
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }
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

  const getTabStyle = (index) => {
    return {
      ...styles.botaoNavegacao,
      borderColor: value === index ? '#41a56d' : '#111',
    };
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataNascimento;
    setShowDatePicker(false);
    setDataNascimento(currentDate);
    setFormulario({ ...formulario, dataNascimento: moment(currentDate).format('YYYY-MM-DD') });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={getTabStyle(0)} onPress={() => handleChangeTab(0)}>
          <Text style={styles.textoBotaoMenu}>Dados Pessoais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getTabStyle(1)} onPress={() => handleChangeTab(1)}>
          <Text style={styles.textoBotaoMenu}>Dados Profissionais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getTabStyle(2)} onPress={() => handleChangeTab(2)}>
          <Text style={styles.textoBotaoMenu}>Documentos</Text>
        </TouchableOpacity>
      </View>
      {value === 0 && (
        <View style={styles.camposContainer}>
          <View style={styles.containerHeader}>
            <Image
              source={
                formulario?.imagemPerfilBase64
                  ? { uri: `data:image/jpeg;base64,${formulario.imagemPerfilBase64}` }
                  : ImagemPadrao
              }
              style={styles.imagem}
            />
          </View>
          <Text style={styles.titulo}>Nome</Text>
          <TextInput
            placeholder="Digite um nome..."
            style={styles.input}
            value={formulario ? formulario.nome : ''}
            onChangeText={text => setFormulario({ ...formulario, nome: text })}
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
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              placeholder="Digite a data de nascimento (dd/mm/yyyy)..."
              style={styles.input}
              value={moment(dataNascimento).format('DD/MM/YYYY')}
              editable={false}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dataNascimento}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.titulo}>Telefone</Text>
          <TextInput
            placeholder="Digite um telefone..."
            style={styles.input}
            value={formulario ? formulario.telefone : ''}
            onChangeText={text => setFormulario({ ...formulario, telefone: text })}
          />
          <Text style={styles.titulo}>CPF</Text>
          <TextInput
            placeholder="Digite o CPF..."
            style={styles.input}
            value={formulario ? formulario.cpfRg : ''}
            onChangeText={text => setFormulario({ ...formulario, cpfRg: text })}
          />
          <Text style={styles.titulo}>E-mail</Text>
          <TextInput
            placeholder="Digite um e-mail..."
            style={styles.input}
            value={formulario ? formulario.email : ''}
            onChangeText={text => setFormulario({ ...formulario, email: text })}
          />
        </View>
      )}
      {value === 1 && (
        <View style={styles.camposContainer}>
          <Text style={styles.titulo}>Cargo</Text>
          <TextInput
            placeholder="Digite o cargo..."
            style={styles.input}
            value={formulario ? formulario.cargo : ''}
            onChangeText={text => setFormulario({ ...formulario, cargo: text })}
          />
          <Text style={styles.titulo}>CREF</Text>
          <TextInput
            placeholder="Digite o CREF..."
            style={styles.input}
            value={formulario ? formulario.cref : ''}
            onChangeText={text => setFormulario({ ...formulario, cref: text })}
          />
          <Text style={styles.titulo}>Federação</Text>
          <TextInput
            placeholder="Digite a federação..."
            style={styles.input}
            value={formulario ? formulario.federacao : ''}
            onChangeText={text => setFormulario({ ...formulario, federacao: text })}
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
    marginTop: 30,
    backgroundColor: '#fff',
    // marginHorizontal: 10,
    borderRadius: 20,
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
  botaoNavegacao: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 4,
    borderRadius: 2,
  },
  textoBotaoMenu: {
    color: '#111',
    fontSize: 12,
    fontWeight: 'bold',
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
    backgroundColor: '#111',
    padding: 10,
    width: 150,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
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
  documentoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imagemNomeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  documentoIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  documentoNome: {
    fontSize: 10,
    textAlign: 'center',
    width: 180,
    marginRight: 10,
  },
  documentoPerfil: {
    fontSize: 16,
    textAlign: 'center',
  },
  documentoAcaoMostrarTexto: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
  },
  documentoAcaoBotao: {
    backgroundColor: '#41a56d',
    width: 70,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  documentoAcaoBotaoExcluir: {
    backgroundColor: '#f00132',
    width: 70,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  mensagemNenhumDocumento: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botaoAdicionarNovo: {
    backgroundColor: '#41a56d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 50,
    left: 280,
    top: 10,
  },
  textoBotaoAdicionarNovo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

});

const generoMap = {
  MASCULINO: 'Masculino',
  FEMININO: 'Feminino',
};

const categoriaMap = {
  CATEGORIA1: 'SUB10',
  CATEGORIA2: 'SUB15',
  CATEGORIA3: 'SUB20',
};

const modalidadeMap = {
  MODALIDADE1: 'BASKET',
  MODALIDADE2: 'FUTEBOL',
  MODALIDADE3: 'VOLEI',
};

const timeMap = {
  TIME1: 'M',
  TIME2: 'F',
};
