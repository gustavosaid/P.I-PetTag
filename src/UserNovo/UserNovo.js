import React, { useEffect, useState } from 'react';
import styles from '../UserNovo/UserNovo.module.css'
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/api';



function UserNovo() {

    // const [id, setId] = useState(null);
    // const [nome, setNome] = useState('');
    // const [nomePet, setNomePet] = useState('');
    // const [tel, setTel] = useState(0);

    // const { responsavelId } = useParams();
    // const history = useHistory();

    // const token = localStorage.getItem('token');

    // const authorization = {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // }

    // useEffect(() => {
    //     if (responsavelId === '0')
    //         return;
    //     else
    //         loadResponsavel();
    // }, responsavelId)

    // async function loadResponsavel() {
    //     try {

    //         const response = await api.get(`api/responsavel/${responsavelId}`, authorization) // coloco endpoint do responsavelID de acordo com o api

    //         setId(response.data.id);
    //         setNome(response.data.nome);
    //         setNomePet(response.data.nomePet);
    //         setTel(response.data.tel);
    //     } catch (error) {
    //         alert('Erro ao recuperar o cadastro' + error);
    //         history.push('/admin');
    //     }
    // }

    // async function saveOrUpdate(event) {
    //     event.preventDefault();

    //     const data = {
    //         nome,
    //         nomePet,
    //         tel

    //     }
    //     try {
    //         if (responsavelId === '0') {
    //             await api.post('api/responsavel', data, authorization);
    //         }else{
    //             data.id = id;
    //             await api.put(`api/responsvel/${id}`,data,authorization)
    //         } 
        

    //     } catch (error) {
    //         alert('erro ao gravar responsavel' + error);
    //     }
    //     history.push('/admin');

    // }

    return (
        <form className={styles.card} > {/*onSubmit={saveOrUpdate}*/}
            <div className={styles.cardHeader}>
                <div className={styles.cardContentArea}>
                    <h2>{/*responsavelId === '0' ? 'Incluir Novo Cadastro' : 'Atualizar Cadastro'*/}Atualizar Dados</h2>
                </div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardContentArea}>
                    <label>Nome Responsavel</label>
                    <input
                        type="text"
                        id="nomes"
                        name="username"
                        // value={nome}
                        // onChange={e => setNome(e.target.value)}
                    />
                </div>

                <div className={styles.cardContentArea}>
                    <label>Nome do Pet</label>
                    <input
                        type="text"
                        id="nomePet"
                        name="username"
                        // value={nomePet}
                        // onChange={e => setNomePet(e.target.value)}

                    />
                </div>
                <div className={styles.cardContentArea}>
                    <label>Telefone</label>
                    <input
                        type="tel"
                        id="tel"
                        name="phone"
                        minlength="8"
                        maxlength="11"
                        // value={tel}
                        // onChange={e => setTel(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.cardFooter}>
                <button type="submit" className={styles.submit} >{/*responsavelId === '0' ? 'Incluir' : 'Atualizar Cadastro'*/}
                    Salvar
                </button>
            </div>

        </form>
    );
}
export default UserNovo;