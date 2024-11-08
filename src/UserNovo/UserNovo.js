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

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const itemsPerPage = Math.ceil(data.length / 2);  // Dividindo em duas páginas

    // Cálculo de itens a serem exibidos por página
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Funções para mudar de página
    const goToNextPage = () => setCurrentPage((prev) => prev + 1);
    const goToPreviousPage = () => setCurrentPage((prev) => prev - 1);

    useEffect(() => {
        async function loadNome_resp() {
            if (!Id || Id === '0') return; // Se Id for nulo ou 0, não carregar

            try {
                console.log('Tentando recuperar dados para o ID:', Id); // Verificar o valor do ID

                const response = await api.get(`/api/rest/${Id}`, authorization);
                console.log('Resposta da API:', response.data); // Log da resposta da API para verificação

                if (response.data) { // Verifica se os dados são válidos
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
                //navigate('/admin');
            }

        }

        loadNome_resp();
    }, [Id, navigate, token]);

    async function saveOrUpdate(event) {
        event.preventDefault();  // Previne o comportamento padrão do formulário

        const data = {
            nome_resp,  // Responsável
            nome_pet,   // Nome do pet
            telefone    // Telefone
        };

        try {
            // Verifica se o 'id' é '0', se sim, faz um POST para criar um novo cadastro
            if (id === '0') {
                await api.post('/api/rest', data, authorization);
            } else {
                // Caso contrário, faz um PUT para atualizar um cadastro existente
                data.id = id;  // Adiciona o 'id' ao objeto de dados para o PUT
                await api.put(`/api/rest/${id}`, data, authorization);
            }
        } catch (error) {
            alert('Erro ao gravar responsável: ' + error);  // Exibe erro em caso de falha
        }

        navigate('/admin');  // Após salvar ou atualizar, redireciona para a página de admin
    }

    return (
        <form className={styles.card} onSubmit={saveOrUpdate}> {/* Descomentado o onSubmit */}
            <div className={styles.cardHeader}>
                <div className={styles.cardContentArea}>
                    <h2>{Id === '1' ? 'Incluir Novo Cadastro' : 'Atualizar Cadastro'}</h2>
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
                    onClick={() => navigate('/admin')} // Corrigido para navegação direta
                >
                    Voltar
                </button>
            </div>
        </form >
    );
}

export default UserNovo;
