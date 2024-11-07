import React, { useEffect, useState } from 'react';
import styles from '../UserNovo/UserNovo.module.css'
import { useParams,useNavigate,} from 'react-router-dom';
import voltar from '../Assets/Images/botao-voltar.png';
import api from  '../services/api';



function UserNovo() {

    const navigate = useNavigate();
    
    const handleEdit = (Id) => {
      navigate('/Admin'); // ( Redireciona para a página de edição do usuário com o ID fornecido
    };

    const [id, setId] = useState(null);
    const [nome_resp, setNomeResp] = useState('');
    const [nome_pet, setNomePet] = useState('');
    const [telefone, setTelefone] = useState();

    const { Id } = useParams();
    

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if (Id === '0')
            return;
        else
            loadNome_resp();
    }, Id)

    async function loadNome_resp() {
        try {

            const response = await api.get(`/api/rest/cadastroGet/${Id}`, authorization) // coloco nedpoint do responsavelID de acordo com o api

            setId(response.data.id);
            setNomeResp(response.data.nome_resp);
            setNomePet(response.data.nome_pet);
            setTelefone(response.data.telefone);
        } catch (error) {
            alert('Erro ao recuperar o cadastro ' + error);
            navigate('/admin');
        }
    }

    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nome_resp,
            nome_pet,
            telefone

        }
        try {
            if (Id === '0') {
                await api.post('api/nome_resp', data, authorization);
            }else{
                data.id = id;
                await api.put(`api/nome_resp/${id}`,data,authorization)
            } 


        } catch (error) {
            alert('erro ao gravar responsavel' + error);
        }
        navigate('/admin');

    }

    return (
        <form className={styles.card} > {/*onSubmit={saveOrUpdate}*/}
            <div className={styles.cardHeader}>
                <div className={styles.cardContentArea}>
                    <h2>{Id === '0' ? 'Incluir Novo Cadastro' : 'Atualizar Cadastro'}</h2>
                </div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardContentArea}>
                    <label>Nome Responsavel</label>
                    <input
                        required="required"
                        type="text"
                        id="nomes"
                        name="username"
                    value={nome_resp}
                    onChange={e => setNomeResp(e.target.value)}
                    />
                </div>

                <div className={styles.cardContentArea}>
                    <label>Nome do Pet</label>
                    <input
                        required="required"
                        type="text"
                        id="nomePet"
                        name="username"
                    value={nome_pet}
                    onChange={e => setNomePet(e.target.value)}

                    />
                </div>
                <div className={styles.cardContentArea}>
                    <label>Telefone</label>
                    <input

                        required="required"
                        type="tel"
                        id="tel"
                        name="phone"
                        minlength="8"
                        maxlength="11"
                        pattern="[0-9]+$"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.cardFooter}>
                <button type="submit" className={styles.submit}   >{/*Id === '0' ? 'Incluir' : 'Atualizar Cadastro'*/}
                    Salvar
                </button>
            </div>
            <div className={styles.cardFooter}>
                <button type="submit" className={styles.submitBack} onClick={() => handleEdit()} >{/*responsavelId === '0' ? 'Incluir' : 'Atualizar Cadastro'*/}
                    Voltar
                </button>
            </div>

            
        </form>
    );
}
export default UserNovo;