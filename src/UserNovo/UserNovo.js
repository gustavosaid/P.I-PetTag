import React, { useEffect, useState } from 'react';
import styles from '../UserNovo/UserNovo.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

function UserNovo() {
    const navigate = useNavigate();
    const { Id } = useParams(); // Captura o 'Id' da URL
    const [id, setId] = useState(Id ? parseInt(Id, 10) : null); // Converte 'Id' para número inteiro
    const [nome_resp, setNomeResp] = useState('');
    const [nome_pet, setNomePet] = useState('');
    const [telefone, setTelefone] = useState('');

    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };

    // Função para carregar dados do cadastro
    useEffect(() => {
        async function loadCadastro() {
            if (!id || id === 0) return;

            try {
                const response = await api.post(
                    '/v1/graphql',
                    {
                        query: `
                            query GetCadastro($id: Int!) {
                                cadastro_by_pk(id: $id) {
                                    id
                                    nome_resp
                                    nome_pet
                                    telefone
                                }
                            }
                        `,
                        variables: { id },
                    },
                    authorization
                );
                const cadastro = response.data.data.cadastro_by_pk;
                if (cadastro) {
                    setId(cadastro.id);
                    setNomeResp(cadastro.nome_resp || '');
                    setNomePet(cadastro.nome_pet || '');
                    setTelefone(cadastro.telefone || '');
                } else {
                    alert('Nenhum dado encontrado para o cadastro.');
                    navigate('/admin');
                }
            } catch (error) {
                console.error('Erro ao recuperar o cadastro:', error);
                alert('Erro de conexão com o servidor. Tente novamente.');
            }
        }

        loadCadastro();
    }, [id, navigate]);

    // Função para salvar ou atualizar o cadastro
    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nome_resp,
            nome_pet,
            telefone,
        };

        try {
            let response;
            if (!id || id === 0) {
                // Criação de novo cadastro
                response = await api.post(
                    '/v1/graphql',
                    {
                        query: `
                            mutation CreateCadastro($nome_resp: String!, $nome_pet: String!, $telefone: String!) {
                                insert_cadastro_one(object: {nome_resp: $nome_resp, nome_pet: $nome_pet, telefone: $telefone}) {
                                    id
                                    nome_resp
                                    nome_pet
                                    telefone
                                }
                            }
                        `,
                        variables: { nome_resp, nome_pet, telefone },
                    },
                    authorization
                );

                console.log('Cadastro Criado:', response.data);

                if (response.data.errors) {
                    console.error('Erro ao criar o cadastro:', response.data.errors);
                    alert('Erro ao criar o cadastro. Detalhes: ' + JSON.stringify(response.data.errors));
                }

            } else {
                // Atualização de cadastro
                response = await api.post(
                    '/v1/graphql',
                    {
                        query: `
                            mutation UpdateCadastro($id: Int!, $nome_resp: String, $nome_pet: String, $telefone: String) {
                                update_cadastro_by_pk(
                                    pk_columns: { id: $id },
                                    _set: { nome_resp: $nome_resp, nome_pet: $nome_pet, telefone: $telefone }
                                ) {
                                    id
                                    nome_resp
                                    nome_pet
                                    telefone
                                }
                            }
                        `,
                        variables: { id, nome_resp, nome_pet, telefone },
                    },
                    authorization
                );

                console.log('Cadastro Atualizado:', response.data);
            }

            alert('Cadastro salvo com sucesso!');
            navigate('/admin');
        } catch (error) {
            console.error('Erro ao gravar responsável:', error.message);
            if (error.response) {
                console.error('Detalhes do erro do servidor:', error.response.data);
            } else if (error.request) {
                console.error('Erro na requisição, sem resposta:', error.request);
            } else {
                console.error('Erro na configuração da requisição:', error.config);
            }

            alert('Erro ao gravar responsável: ' + (error.response ? error.response.data : error.message));
        }
    }

    return (
        <form className={styles.card} onSubmit={saveOrUpdate}>
            <div className={styles.cardHeader}>
                <div className={styles.cardContentArea}>
                    <h2>{Id === '0' ? 'Incluir Novo Cadastro' : 'Atualizar Cadastro'}</h2>
                </div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardContentArea}>
                    <label>Nome Responsável</label>
                    <input
                        required
                        type="text"
                        value={nome_resp}
                        onChange={e => setNomeResp(e.target.value)}
                    />
                </div>

                <div className={styles.cardContentArea}>
                    <label>Nome do Pet</label>
                    <input
                        required
                        type="text"
                        value={nome_pet}
                        onChange={e => setNomePet(e.target.value)}
                    />
                </div>

                <div className={styles.cardContentArea}>
                    <label>Telefone</label>
                    <input
                        required
                        type="tel"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.cardFooter}>
                <button type="submit" className={styles.submit}>
                    {Id === '0' ? 'Incluir' : 'Atualizar Cadastro'}
                </button>
            </div>

            <div className={styles.cardFooter}>
                <button
                    type="button"
                    className={styles.submitBack}
                    onClick={() => navigate('/admin')}
                >
                    Voltar
                </button>
            </div>
        </form>
    );
}

export default UserNovo;
