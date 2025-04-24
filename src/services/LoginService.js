import axios from './BaseService';

export const API_URL = 'https://geresportes-backend.onrender.com';


export const login = (username, password, source) => {
  return axios.post(`${API_URL}/Login/Login`, {
    senha: password,
    email: username
  },{
    cancelToken: source.token
  });
}


//envia para qual email sera recuperado a senha

export const recuperacao = (email, source) => {
  return axios.put(`${API_URL}/Email/EsqueciMinhaSenha`, {
    emailTo: email
  },{    cancelToken: source.token
  });
}


// envia codigo de recuperação para validar no backend

export const validaCodigoRecuperacao = (email,codigoRecuperacao, source) => {
  return axios.post(`${API_URL}/email/validarCodigoRecuperacao`, {
    email: email,
    codigoRecuperacao: codigoRecuperacao,
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      cancelToken: source.token
    });
  }




export const redefinirSenha = (codigo,senha, password, source) => {
  return axios.put(`${API_URL}/Usuario/SalvarSenha`, {
    CodigoUsuario: codigo,
    SenhaConfirmacao: senha,
    SenhaNova: password
  },{
    cancelToken: source.token
  });
}
