import React, { useEffect, useState } from 'react';
import styles from '../UserNovo/UserNovo.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

function UserNovo() {
    const navigate = useNavigate();
    const { Id } = useParams();

    const [id, setId] = useState(null);
    const [nome_resp, setNomeResp] = useState('');
    const [nome_pet, setNomePet] = useState('');
    const [telefone, setTelefone] = useState('');
    const [data, setData] = useState([]);  // Definindo o estado para `data`
    const [currentPage, setCurrentPage] = useState(1);  // Para controle de paginação

    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // Função para carregar dados do cadastro
    useEffect(() => {
    async function loadNome_resp() {
        if (!Id || Id === '0') return;

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado.');
            return;
        }

        console.log('Token:', token);
        console.log('ID:', Id);

        try {
            const response = await api.get(`/api/rest/${Id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Resposta da API:', response.data);
            if (response.data) {
                setId(response.data.id);
                setNomeResp(response.data.nome_resp || '');
                setNomePet(response.data.nome_pet || '');
                setTelefone(response.data.telefone || '');
            } else {
                alert('Nenhum dado encontrado para o cadastro.');
                navigate('/admin');
            }
        } catch (error) {
            console.error('Erro ao recuperar o cadastro:', error); // Apenas error, sem `response`
            alert('Erro de conexão com o servidor. Tente novamente.');
        }
    }

    loadNome_resp();
}, [Id, navigate]);

    // Função para salvar ou atualizar o cadastro
    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nome_resp,
            nome_pet,
            telefone
        };

        try {
            if (id === '0' || !id) {  // Criação de novo cadastro
                await api.post('/api/rest', data, authorization);
            } else {  // Atualização de cadastro existente
                data.id = id;
                await api.put(`/api/rest/${id}`, data, authorization);
            }

            alert('Cadastro salvo com sucesso!');
            navigate('/admin');  // Redireciona para a página de admin após salvar
        } catch (error) {
            alert('Erro ao gravar responsável: ' + error);
        }
    }

    // Lógica para dividir os itens em páginas (opcional)
    const itemsPerPage = Math.ceil(data.length / 2);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
