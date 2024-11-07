import React, { useEffect, useState } from 'react';
import styles from '../Admin/Admin.module.css';
import wzap from '../Assets/Images/whatsapp.png';
import excluir from '../Assets/Images/botao-apagar.png';
import editar from '../Assets/Images/editar.png';
import reactLogo from '../Assets/Images/logo.png';
import pessoas from '../Assets/Images/pessoas.png';
import animals from '../Assets/Images/animais-de-estimacao.png'
import telefone from '../Assets/Images/telefone-fixo.png'
import { useNavigate } from 'react-router-dom';
import { cadastroGet, cadastroDelete } from '../services/api';

// import api from '../services/api';



// const confirmarExclusao = () => {
//   const confirmacao = alert("Tem certeza que deseja excluir esta linha?");
//   if (confirmacao) {

//     // Aqui você pode adicionar o código para excluir a linha.
//     alert("Linha excluída com sucesso!");
//   } else {
//     alert("Exclusão cancelada.");
//   }
// }

function Admin() {

  const navigate = useNavigate();
  const [dados, setDados] = useState([]);



  const handleEdit = (Id) => {
    navigate(`/admin/editar/${Id}`); // Corrigido para incluir o ID na URL
  };


  async function editCadastro(id) {
  try{
    navigate('/admin') // endpoint do responsavel novo responsavel/novo/${id}
  } catch(error){
    alert('Nao e possivel editar o cadastro')
  }   
  }


  // Exemplo de uso do GET ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cadastroGet();
        console.log('Estrutura completa dos dados:', data);
        setDados(data.cadastro);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    fetchData();
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      try {
        console.log("Tentando excluir o item com ID:", id);
        
        setDados(dados.filter(item => item.id !== id)); // Remove o item excluído da lista
        alert("Item excluído com sucesso!");
      } catch (error) {
        if (error.response) {
          console.log("Erro na resposta da API:", error.data);
        } else {
          console.error("Erro desconhecido:", error);
        }
        throw error;
      }
    }
  };



  return (
    <div className={styles.corpo}>
      <img src={reactLogo} alt="logo pet tag" className={styles.logo} />
      <div className={styles.headersConteudo}>
        <table className={styles.table}>

          {/* Cabeçalho da tabela */}
          <thead>
            <tr>
              <th scope="col" >
                <img src={pessoas} className={styles.tags} alt="Foto de pessoas" />
              </th>
              <th scope="col" >
                <img src={animals} className={styles.tags} alt="Animais" />
              </th>
              <th scope="col" >
                <img src={telefone} className={styles.tags} alt="Telefone para contato" />
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
                  <td className={styles.centerAlign}>{item.telefone }</td>
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
                    <button onClick={() => handleEdit()} className={styles.button}>
                      <img src={editar} alt="editar" className={styles.icon} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.centerAlign}>Nenhum dado disponível</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Admin;
