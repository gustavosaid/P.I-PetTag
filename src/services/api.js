import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sweeping-skunk-98.hasura.app',
  timeout: 10000, // 5 segundos
  headers: {
    'x-hasura-admin-secret': 'x00yP3MGCTzCC4ZhuoOomsBZXKiSIztQGN9faITw6uJDeL0d7gL2SsnCjKMuwVow',
  },
});


// Função para o POST
export const cadastroPost = async (data) => {
    try {
      const response = await api.post('/api/rest/cadastropost ', data);
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

// Funcao para DELETE
// export const cadastroDelete = async (id) => {
//   axios.delete(`https://sweeping-skunk-98.hasura.app/api/rest/cadastrodelete`)
  
// .then(() => {
//   getData();
// })
// };

export const cadastroUpdate = async (id, nome_resp, nome_pet, telefone) => {
  try {
    // Dados a serem atualizados
    const data = {
      nome_resp,
      nome_pet,
      telefone
    };

    // Enviar os dados no corpo da requisição PUT
    const response = await api.put(`/api/rest/cadastroput/${id}`, data);
    
    //console.log("Cadastro atualizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar os dados:", error);
    throw error;  // Re-lança o erro para que possa ser tratado em outro lugar
  }
};

export const cadastroDelete = async (id) => {
  try {
    const response = await api.delete(`/api/rest/cadastrodelete/${id}`);
    //console.log("Resposta da API para a exclusão:", response.data);
    return response.data;  // Retorna a resposta de sucesso
  } catch (error) {
    console.error('Erro ao excluir o item:', error);
    throw error;  // Propaga o erro para ser tratado no frontend
  }
};
 
export default api;