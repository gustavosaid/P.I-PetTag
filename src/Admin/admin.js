import React from "react";
import styles from '../Admin/Admin.module.css';
import wzap from '../Assets/Images/whatsapp.png';
import excluir from '../Assets/Images/botao-apagar.png';
import editar from '../Assets/Images/editar.png';
import reactLogo from '../Assets/Images/logo.png';
import pessoas from '../Assets/Images/pessoas.png';
import animals from '../Assets/Images/animais-de-estimacao.png'
import telefone from '../Assets/Images/telefone-fixo.png'
import { useNavigate } from 'react-router-dom';

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

  const handleEdit = (Id) => {
    navigate('/UserNovo/'); // ('/UserNovo/${userId} Redireciona para a página de edição do usuário com o ID fornecido
  };

  // async function editCadastro(id) {
  // try{
  //   history.push('/admin') // endpoint do responsavel novo `responsavel/novo/${id}`
  // } catch(error){
  //   alert('Nao e possivel editar o cadastro')
  // }   
  // }

  // async function deleteCadastro(id){
  //   try{
  //     if(window.confirm('Deseja deletar o cadastro: '+ nome_resp + '?')){
  //       await api.delete(`api/responsavel/${id},authorization`);
  //       setResponsavel(responsvel.filter(nome_resp => nome_resp.id !== id));
  //     }
  //   } catch(error) {
  //     alert('Não é possivel excluir o cadastro')
  //   }
  // }

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
            <tr>
              <td className={styles.centerAlign}>Gustavo </td>
              <td className={styles.centerAlign}>Bianca</td>
              <td className={styles.centerAlign}>34 999999999</td>
              <td className={styles.centerAlign}>
                <button className={styles.button}>  {/*Chama api do Whatsapp*/}
                  <img src={wzap} alt="whatsapp" className={styles.icon} />
                </button >
              </td>

              <td className={styles.centerAlign}>
                <button className={styles.button} > {/*onClick={() => deleteCadastro(nome_resp.id)}*/}
                  <img src={excluir} alt="deletar" className={styles.icon} />
                </button>
              </td>

              <td className={styles.centerAlign}>
                <button onClick={() => handleEdit(1)} className={styles.button} >{/*Chama editar*/} {/*onClick={() => editCadastro(nome_resp.id)*/}
                  <img src={editar} alt="editar" className={styles.icon} />
                </button >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  );
}

export default Admin;
