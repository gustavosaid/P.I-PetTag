import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../Admin/Admin.module.css';
import wzap from '../Assets/Images/whatsapp.png';
import excluir from '../Assets/Images/botao-apagar.png';
import editar from '../Assets/Images/editar1.png';
import reactLogo from '../Assets/Images/logo.png';


function Admin() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o id da URL para edição
  //console.log('ID capturado da URL:', id);

  const [dados, setDados] = useState([]);
  const [nomePet, setNomePet] = useState('');
  const [nomeResp, setNomeResp] = useState('');
  const [telefone, setTelefone] = useState('');

  // const token = localStorage.getItem('token');
  // const authorization = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };


  // Gerar link para whatsapp web
  function generateWhatsAppLink(telefoneNumber, nomeResp, nomePet) {
    const telefoneString = telefoneNumber ? telefoneNumber.toString() : '';
    const telefoneFormatado = telefoneString.replace(/\D/g, '');
  
    if (telefoneFormatado === '') {
      console.warn('Número de telefone não fornecido ou inválido');
      return '#';
    }
  
    // Mensagem do wpp
    const mensagem = `Olá ${nomeResp}, estamos entrando em contato pois localizamos seu animalzinho, ${nomePet} foi encontrado. `;
    const mensagemEncoded = encodeURIComponent(mensagem); // Codifica a mensagem para a URL
  
    // Url q sera usada no whatsapp
    return `https://wa.me/55${telefoneFormatado}?text=${mensagemEncoded}`;
  }
  



  // Carregar todos os cadastros
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
  }, []);

  // Buscar dados do cadastro específico para edição
  useEffect(() => {
    if (id && dados.length > 0) {
      const cadastroToEdit = dados.find(item => item.id === parseInt(id, 10));
      if (cadastroToEdit) {
        setNomePet(cadastroToEdit.nome_pet);
        setNomeResp(cadastroToEdit.nome_resp);
        setTelefone(cadastroToEdit.telefone);
      } else {
        console.warn('Cadastro não encontrado para o ID:', id);
      }
    }
  }, [id, dados]);

  // Função de editar cadastro
  const handleEdit = async () => {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) {
      alert("ID inválido. Por favor, verifique o ID e tente novamente.");
      return;
    }

    try {
      const response = await axios.post(
        'https://sweeping-skunk-98.hasura.app/v1/graphql',
        {
          query: `
            mutation UpdateCadastro($id: Int!, $nome_pet: String, $nome_resp: String, $telefone: String) {
              update_cadastro_by_pk(
                pk_columns: { id: $id }
                _set: { nome_pet: $nome_pet, nome_resp: $nome_resp, telefone: $telefone }
              ) {
                id
                nome_pet
                nome_resp
                telefone
              }
            }
          `,
          variables: {
            id: idInt,
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
        //console.log('Cadastro atualizado com sucesso:', response.data);
        alert('Cadastro atualizado com sucesso!');
        navigate(`/admin`);
      } else {
        alert('Erro ao atualizar o cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao realizar a mutação:', error);
      alert('Ocorreu um erro ao tentar atualizar o cadastro. Por favor, tente novamente mais tarde.');
    }
  };

  // Função de excluir cadastro
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
          setDados(dados.filter(item => item.id !== id));
          alert('Cadastro excluído com sucesso!');
          navigate(`/admin`); // Redireciona após exclusão
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
        <div className={styles.tableScrool}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Nome Responsável</th>
                <th scope="col" >Nome Pet</th>
                <th scope="col">Telefone</th>
                <th scope="col">Whatsapp</th>
                <th scope="col">Excluir</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(dados) && dados.length > 0 ? (
                dados.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.centerAlign}>{item.nome_resp}</td>
                    <td className={styles.centerAlign}>{item.nome_pet}</td>
                    <td className={styles.centerAlign}>{item.telefone}</td>
                    <td className={styles.centerAlign}>
                      <button className={styles.button}  onClick={() => window.open(generateWhatsAppLink(item.telefone, item.nome_resp, item.nome_pet), '_blank')} >
                        <img src={wzap} alt="whatsapp" className={styles.icon} />
                      </button>
                    </td>
                    <td className={styles.centerAlign}>
                      <button className={styles.button} onClick={() => handleDelete(item.id)}>
                        <img src={excluir} alt="deletar" className={styles.icon} />
                      </button>
                    </td>
                    <td className={styles.centerAlign}>
                      <button onClick={() => navigate(`/admin/editar/${item.id}`)} className={styles.button}>
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

      {/* Formulário de Edição */}
      {id && (
        <div className={styles.formContainer}>
          <h2>Editar Cadastro</h2>
          <form onSubmit={handleEdit}>
            {/* Campos de entrada */}
            <input
              type="text"
              placeholder="Nome do Pet"
              value={nomePet}
              onChange={(e) => setNomePet(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nome do Responsável"
              value={nomeResp}
              onChange={(e) => setNomeResp(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              
            />
            <button type="submit">Atualizar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Admin;
