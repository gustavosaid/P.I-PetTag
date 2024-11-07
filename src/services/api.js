import axios from 'axios';

const api = axios.create({
    //baseURL: "http://localhost:5001",
    baseURL: 'https://sweeping-skunk-98.hasura.app',
    headers: {
        'x-hasura-admin-secret': 'x00yP3MGCTzCC4ZhuoOomsBZXKiSIztQGN9faITw6uJDeL0d7gL2SsnCjKMuwVow',
    },
});


// Função para o POST
export const cadastroPost = async (data) => {
    try {
      const response = await api.post('/api/rest/cadastropost', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o POST:', error);
      throw error;
    }
  };
  
  // Função para o GET
  export const cadastroGet = async () => {
    try {
      const response = await api.get('/api/rest/cadastroget');
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o GET:', error);
      throw error;
    }
  };

export default api;