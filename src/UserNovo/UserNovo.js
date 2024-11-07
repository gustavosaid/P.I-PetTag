import React, { useEffect, useState } from 'react';
import styles from '../UserNovo/UserNovo.module.css';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../services/api';

function UserNovo() {
    const navigate = useNavigate();
    const { Id } = useParams();


   


    const [id, setId] = useState(null);
    const [nome_resp, setNomeResp] = useState('');
    const [nome_pet, setNomePet] = useState('');
    const [telefone, setTelefone] = useState('');

    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        if (id !== '0') {
            loadNome_resp(); // Carregar os dados apenas se o ID for válido
        }
    }, [id]);

    async function loadNome_resp() {
        try {
            const response = await api.get(`/api/rest/cadastroget/${Id}`, authorization); // Corrigido para a URL correta
            setId(response.data.id);
            setNomeResp(response.data.nome_resp);
            setNomePet(response.data.nome_pet);
            setTelefone(response.data.telefone);
        } catch (error) {
            alert('Erro ao recuperar o cadastro: ' + error);
            navigate('/admin');
        }
    }

    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nome_resp,
            nome_pet,
            telefone
        };

        try {
            if (Id === '0') {
                await api.post('/api/nome_resp', data, authorization);
            } else {
                data.id = id;
                await api.put(`/api/nome_resp/${id}`, data, authorization);
            }
        } catch (error) {
            alert('Erro ao gravar responsável: ' + error);
        }

        navigate('/admin');
    }

    return (
        <form className={styles.card} onSubmit={saveOrUpdate}> {/* Descomentado o onSubmit */}
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
                        onChange={(e) => setNomeResp(e.target.value)}
                    />
                </div>

                <div className={styles.cardContentArea}>
                    <label>Nome do Pet</label>
                    <input
                        required
                        type="text"
                        value={nome_pet}
                        onChange={(e) => setNomePet(e.target.value)}
                    />
                </div>

                <div className={styles.cardContentArea}>
                    <label>Telefone</label>
                    <input
                        required
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
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
                    onClick={() => navigate('/admin')} // Corrigido para navegação direta
                >
                    Voltar
                </button>
            </div>
        </form>
    );
}

export default UserNovo;
