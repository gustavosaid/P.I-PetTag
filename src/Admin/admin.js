import React from "react";
import styles from '../Admin/Admin.module.css';
import wzap from '../Assets/Images/whatsapp.png';
import excluir from '../Assets/Images/excluir.png';
import editar from '../Assets/Images/editar.png';
import reactLogo from '../Assets/Images/logo.png'




function Admin() {
  return (
    <div className={styles.corpo}>
      <img src={reactLogo} alt="logo pet tag" className={styles.logo} />
      <div className={styles.headersConteudo}>
        <table className={styles.table}>

          {/* Cabeçalho da tabela */}
          <thead>
            <tr>
              <th scope="col" className={styles.leftAlign}>Responsável</th>
              <th scope="col" className={styles.centerAlign}>Nome do Pet</th>
              <th scope="col" className={styles.centerAlign}>Telefone</th>
              <th scope="col" className={styles.centerAlign}>Ações</th>
              <th scope="col" className={styles.centerAlign}>Excluir</th>
              <th scope="col" className={styles.centerAlign}>Editar</th>
            </tr>
          </thead>

          {/* Corpo da tabela */}
          <tbody>
            <tr>
              <td className={styles.centerAlign}>Laura Vitoria</td>
              <td className={styles.centerAlign}>Vilma Tereza</td>
              <td className={styles.centerAlign}>34 996390833</td>
              <td className={styles.centerAlign}>
                <a href="https://api.whatsapp.com/">  {/*Chama api do Whatsapp*/}
                  <img src={wzap} alt="whatsapp" className={styles.icon} />
                </a>
              </td>

              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/" >{/*Chama api do Excluir*/}
                  <img src={excluir} alt="whatsapp" className={styles.icon} />
                </a>
              </td>

              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/" >{/*Chama editar*/}
                  <img src={editar} alt="whatsapp" className={styles.icon} />
                </a>
              </td>
            </tr>

            <tr>
              <td className={styles.centerAlign}>Gustavo Ribeiro</td>
              <td className={styles.centerAlign}>Bianca</td>
              <td className={styles.centerAlign}>34 996336172</td>

              <td className={styles.centerAlign}>
                <a href="https://api.whatsapp.com/" > {/*Chama api do Whatsapp*/}
                  <img src={wzap} alt="whatsapp" className={styles.icon} />
                </a>
              </td>

              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/" > {/*Chama  Excluir*/}
                  <img src={excluir} alt="whatsapp" className={styles.icon} />
                </a>
              </td>
              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/" >{/*Chama editar */}
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
