import React from "react";
import styles from '../Admin/Admin.module.css';
import wzap from '../Assets/Images/whatsapp.png';
import excluir from '../Assets/Images/excluir.png';
import editar from '../Assets/Images/editar.png';
import reactLogo from '../Assets/Images/logo.png';
import pessoas from '../Assets/Images/pessoas.png';
import animals from '../Assets/Images/animais-de-estimacao.png'
import telefone from '../Assets/Images/telefone-fixo.png'




function Admin() {

  return (
      <div className={styles.corpo}>
        <img src={reactLogo} alt="logo pet tag" className={styles.logo} />
        <div className={styles.headersConteudo}>
          <table className={styles.table}>

            {/* Cabeçalho da tabela */}
            <thead>
              <tr>
                <th scope="col" >
                  <img src={pessoas} className={styles.tags} alt="Foto de pessoas"/>
                </th>
                <th scope="col" >
                  <img src={animals} className={styles.tags} alt="Animais" />
                </th>
                <th scope="col" >
                  <img src={telefone} className={styles.tags} alt="Telefone para contato" />
                </th>
                <th scope="col" >Whatsapp</th>
                <th scope="col" >Excluir</th>
                <th scope="col" >Editar</th>
              </tr>
            </thead>

            {/* Corpo da tabela */}
            <tbody>
              <tr>
                <td className={styles.centerAlign}>1234567890</td>
                <td className={styles.centerAlign}>Vilma</td>
                <td className={styles.centerAlign}>34 8888888888</td>
                <td className={styles.centerAlign}>
                  <a href="#">  {/*Chama api do Whatsapp*/}
                    <img src={wzap} alt="whatsapp" className={styles.icon} />
                  </a>
                </td>

                <td className={styles.centerAlign}>
                  <a href="#" >{/*Chama api do Excluir*/}
                    <img src={excluir} alt="whatsapp" className={styles.icon} />
                  </a>
                </td>

                <td className={styles.centerAlign}>
                  <a href="#" >{/*Chama editar*/}
                    <img src={editar} alt="whatsapp" className={styles.icon} />
                  </a>
                </td>
              </tr>

              <tr>
                <td className={styles.centerAlign}>Individuo B</td>
                <td className={styles.centerAlign}>Bianca</td>
                <td className={styles.centerAlign}>34 999999999</td>

                <td className={styles.centerAlign}>
                  <a href="#" > {/*Chama api do Whatsapp*/}
                    <img src={wzap} alt="whatsapp" className={styles.icon} />
                  </a>
                </td>

                <td className={styles.centerAlign}>
                  <a href="#" > {/*Chama  Excluir*/}
                    <img src={excluir} alt="whatsapp" className={styles.icon} />
                  </a>
                </td>
                <td className={styles.centerAlign}>
                  <a href="#" >{/*Chama editar */}
                    <img src={editar} alt="whatsapp" className={styles.icon} />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    

  );
}

export default Admin;
