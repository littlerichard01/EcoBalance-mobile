import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// #region Conexão Front-Back (Configuração da API)
// Pega o IP dinamicamente do host do Expo (o computador que está rodando o projeto)
// debuggerHost costuma vir como "192.168.0.x:8081"
const debuggerHost = Constants.expoConfig?.hostUri;
const localhost = debuggerHost?.split(':')[0] || 'localhost';

// Em produção ou caso tenha um .env (EXPO_PUBLIC_API_URL), ele usa a variável.
// Se não, monta a URL dinamicamente apontando para o PC do desenvolvedor na porta 3000.
const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://${localhost}:3000/api`;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para injetar o token JWT em todas as requisições se ele existir
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('@EcoBalance:token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// #endregion

export default api;
