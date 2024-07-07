// HomeService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://geresportes.azurewebsites.net';

const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('@auth_token');
  return token;
};

export const atletasPorModalidade = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/Dashboard/ListarAtletasPorModalidde`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const ListarAtletasMediaIdade = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/Dashboard/ListarAtletasMediaIdade`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const ListarAtletasGeneroFeminino = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/Dashboard/ListarAtletasGeneroFeminino`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const ListarMediasPorcentagens = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/Dashboard/ListarMediasEPorcentagens`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
