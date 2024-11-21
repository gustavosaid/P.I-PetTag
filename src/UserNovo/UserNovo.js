import React, { useEffect, useState } from 'react';
import styles from '../UserNovo/UserNovo.module.css';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../services/api.js';

function UserNovo() {

    const navigate = useNavigate();

    const { Id } = useParams();

    const [id, setId] = useState(Id ? parseInt(Id, 10) : null);
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

    useEffect(() => {
        async function loadCadastro() {
            if (!id) return; // Se não há `id`, não tenta carregar.

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
                    setTelefone(cadastro.telefone ? cadastro.telefone.toString() : '');
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

    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nome_resp,
            nome_pet,
            telefone: parseInt(telefone, 10),
        };

        try {
            let response;
            if (id === null) { // Verificação estrita se `id` é nulo (novo cadastro)
                response = await api.post(
                    '/v1/graphql',
                    {
                        query: `
                            mutation CreateCadastro($nome_resp: String!, $nome_pet: String!, $telefone: numeric!) {
                                insert_cadastro_one(object: {nome_resp: $nome_resp, nome_pet: $nome_pet, telefone: $telefone}) {
                                    id
                                    nome_resp
                                    nome_pet
                                    telefone
                                }
                            }
                        `,
                        variables: data,
                    },
                    authorization
                );
                //console.log('Cadastro Criado:', response.data);
            } else {
                // Atualização de cadastro
                response = await api.post(
                    '/v1/graphql',
                    {
                        query: `
                            mutation UpdateCadastro($id: Int!, $nome_resp: String, $nome_pet: String, $telefone: numeric) {
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
                        variables: { ...data, id },
                    },
                    authorization
                );
                //console.log('Cadastro Atualizado:', response.data);
            }

            alert('Cadastro salvo com sucesso!');
            navigate('/admin');
        } catch (error) {
            console.error('Erro ao gravar responsável:', error.message);
            alert('Erro ao gravar responsável: ' + (error.response ? error.response.data : error.message));
        }
    }

    return (
        <form className={styles.card} onSubmit={saveOrUpdate}>
            <div className={styles.cardHeader}>
                <div className={styles.cardContentArea}>
                    <h2>{id ? 'Atualizar Cadastro' : 'Incluir Novo Cadastro'}</h2>
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
                        minLength={10}
                        maxLength={11}
                    />
                </div>
            </div>

            <div className={styles.cardFooter}>
                <button type="submit" className={styles.submit}>
                    {id ? 'Atualizar Cadastro' : 'Incluir'}
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
