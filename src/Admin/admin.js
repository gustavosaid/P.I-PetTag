import React, { useEffect, useState } from 'react';
import styles from '../Admin/Admin.module.css';
import wzap from '../Assets/Images/whatsapp.png';
import excluir from '../Assets/Images/botao-apagar.png';
import editar from '../Assets/Images/editar.png';
import reactLogo from '../Assets/Images/logo.png';
import pessoas from '../Assets/Images/pessoas.png';
import phone from '../Assets/Images/telefone-fixo.png';
import animals from '../Assets/Images/animais-de-estimacao.png';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o id da URL para edição
  const [dados, setDados] = useState([]);
  const [nomePet, setNomePet] = useState('');
  const [nomeResp, setNomeResp] = useState('');
  const [telefone, setTelefone] = useState('');
  const token = localStorage.getItem('token');
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Carregar os cadastros ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://sweeping-skunk-98.hasura.app/v1/graphql',
          {
            query: `
              query {
                cadastro {
                  id
                  nome_pet
                  nome_resp
                  telefone
                }
              }
            `,
          },
          {
            headers: {
              'x-hasura-admin-secret': 'x00yP3MGCTzCC4ZhuoOomsBZXKiSIztQGN9faITw6uJDeL0d7gL2SsnCjKMuwVow',
            },
          }
        );
        setDados(response.data.data.cadastro);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();

    // Se estiver na página de edição, buscar os dados do cadastro específico
    if (id) {
      const cadastroToEdit = dados.find(item => item.id === parseInt(id));
      if (cadastroToEdit) {
        setNomePet(cadastroToEdit.nome_pet);
        setNomeResp(cadastroToEdit.nome_resp);
        setTelefone(cadastroToEdit.telefone);
      }
    }
  }, [id, dados]);  // Dependência em dados e id para garantir que a edição só aconteça quando o id estiver disponível

  // Função para editar um cadastro
  const handleEdit = async () => {
    try {
      const response = await axios.post(
        'https://sweeping-skunk-98.hasura.app/v1/graphql',
        {
          query: `
            mutation UpdateCadastro($id: Int!, $nome_pet: String, $nome_resp: String, $telefone: String) {
              update_cadastro_by_pk(
                pk_columns: { id: $id }
                _set: {
                  nome_pet: $nome_pet
                  nome_resp: $nome_resp
                  telefone: $telefone
                }
              ) {
                id
                nome_pet
                nome_resp
                telefone
              }
            }
          `,
          variables: {
            id: parseInt(id),  // Usando o ID da URL para atualizar
            nome_pet: nomePet,
            nome_resp: nomeResp,
            telefone: telefone,
          },
        },
        {
          headers: {
            'x-hasura-admin-secret': 'x00yP3MGCTzCC4ZhuoOomsBZXKiSIztQGN9faITw6uJDeL0d7gL2SsnCjKMuwVow',
          },
        }
      );
      if (response.data.data.update_cadastro_by_pk) {
        alert('Cadastro atualizado com sucesso!');
        navigate('/admin');  // Redireciona para a página Admin após a atualização
      }
    } catch (error) {
      console.error('Erro ao atualizar o cadastro:', error);
      alert('Erro ao atualizar o cadastro!');
    }
  };

  // Função para excluir um cadastro
  const handleDelete = async (id) => {
    const confirmation = window.confirm('Tem certeza que deseja excluir este item?');
    if (confirmation) {
      try {
        const response = await axios.post(
          'https://sweeping-skunk-98.hasura.app/v1/graphql',
          {
            query: `
              mutation DeleteCadastro($id: Int!) {
                delete_cadastro_by_pk(id: $id) {
                  id
                }
              }
            `,
            variables: {
              id: id,
            },
          },
          {
            headers: {
              'x-hasura-admin-secret': 'x00yP3MGCTzCC4ZhuoOomsBZXKiSIztQGN9faITw6uJDeL0d7gL2SsnCjKMuwVow',
            },
          }
        );
        if (response.data.data.delete_cadastro_by_pk) {
          setDados(dados.filter(item => item.id !== id));  // Atualiza a lista após exclusão
          alert('Cadastro excluído com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao excluir o item:', error);
        alert('Erro ao excluir o item!');
      }
    }
  };

  return (
    <div className={styles.corpo}>
      <img src={reactLogo} alt="logo pet tag" className={styles.logo} />
      <div className={styles.headersConteudo}>
        <div className={styles.teste}>
          <table className={styles.table}>
            {/* Cabeçalho da tabela */}
            <thead>
              <tr>
                <th scope="col">
                  <img src={pessoas} className={styles.tags} alt="Foto de pessoas" />
                </th>
                <th scope="col">
                  <img src={animals} className={styles.tags} alt="Animais" />
                </th>

                <th scope="col">
                  <img src={phone} className={styles.tags} alt="Telefone" />
                </th>

                <th scope="col">Whatsapp</th>
                <th scope="col">Excluir</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>

            {/* Corpo da tabela */}
            <tbody>
              {Array.isArray(dados) && dados.length > 0 ? (
                dados.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.centerAlign}>{item.nome_resp}</td>
                    <td className={styles.centerAlign}>{item.nome_pet}</td>
                    <td className={styles.centerAlign}>{item.telefone}</td>
                    <td className={styles.centerAlign}>
                      <button className={styles.button}>
                        <img src={wzap} alt="whatsapp" className={styles.icon} />
                      </button>
                    </td>
                    <td className={styles.centerAlign}>
                      <button className={styles.button} onClick={() => handleDelete(item.id)}>
                        <img src={excluir} alt="deletar" className={styles.icon} />
                      </button>
                    </td>
                    <td className={styles.centerAlign}>
                      <button onClick={() => handleEdit(item.id)} className={styles.button}>
                        <img src={editar} alt="editar" className={styles.icon} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.centerAlign}>Carregando...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

export default Admin;
