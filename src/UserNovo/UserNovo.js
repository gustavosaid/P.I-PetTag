import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Altere o caminho conforme necessário

function UserNovo() {
    // Carregar dados ao acessar a página de edição
    useEffect(() => {
        async function loadData() {
            if (!Id || Id === '0') return;  // Se Id for nulo ou 0, não carregar

            try {
                console.log('Tentando recuperar dados para o ID:', Id); // Verificar o valor do ID

                const response = await api.get(`/api/rest/${Id}`, authorization);
                console.log('Resposta da API:', response.data);  // Log da resposta da API para verificação

                if (response.data) {
                    // Preencher o formulário com os dados recuperados da API
                    setId(response.data.id);
                    setNomeResp(response.data.nome_resp || '');
                    setNomePet(response.data.nome_pet || '');
                    setTelefone(response.data.telefone || '');
                } else {
                    alert('Nenhum dado encontrado para o cadastro.');
                    navigate('/admin');
                }
            } catch (error) {
                console.error('Erro ao recuperar o cadastro:', error.message);
                alert('Erro ao recuperar o cadastro. Por favor, tente novamente.');
            }
        }

        loadData();
    }, [Id, navigate, token]);

    // Função para salvar ou atualizar os dados
    async function saveOrUpdate(event) {
        event.preventDefault();  // Previne o comportamento padrão do formulário

        const data = {
            nome_resp,  // Responsável
            nome_pet,   // Nome do pet
            telefone    // Telefone
        };

        try {
            // Verifica se o 'id' é '0', se sim, faz um POST para criar um novo cadastro
            if (id === '0' || !id) {
                await api.post('/api/rest', data, authorization);
                alert('Cadastro realizado com sucesso!');
            } else {
                // Caso contrário, faz um PUT para atualizar um cadastro existente
                data.id = id;  // Adiciona o 'id' ao objeto de dados para o PUT
                await api.put(`/api/rest/${id}`, data, authorization);
                alert('Cadastro atualizado com sucesso!');
            }
        } catch (error) {
            alert('Erro ao gravar responsável: ' + error);  // Exibe erro em caso de falha
        }

        navigate('/admin');  // Após salvar ou atualizar, redireciona para a página de admin
    }


  return (
    <form onSubmit={handleSave}>
      {/* Seu formulário de edição */}
      <input
        type="text"
        value={nome_resp}
        onChange={(e) => setNomeResp(e.target.value)}
        placeholder="Nome do Responsável"
      />
      <input
        type="text"
        value={nome_pet}
        onChange={(e) => setNomePet(e.target.value)}
        placeholder="Nome do Pet"
      />
      <input
        type="tel"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="Telefone"
      />
      <button type="submit">{id ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
}

export default UserNovo;
