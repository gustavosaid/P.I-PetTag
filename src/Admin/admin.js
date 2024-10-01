import React from "react";
import styles from '../Admin/Admin.module.css';
import wzap from '../Assets/Images/whatsapp.png';
import reactLogo from '../Assets/Images/logo.png';
import { MdDeleteOutline } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";



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

            </tr>
          </thead>

          {/* Corpo da tabela */}
          <tbody>
            <tr>
              <td className={styles.centerAlign}>Laura Vitoria</td>
              <td className={styles.centerAlign}>Vilma Tereza</td>
              <td className={styles.centerAlign}>34 996390833</td>
              <td className={styles.centerAlign}>
                <button className={styles.centerAlign} >
                <BsWhatsapp className={styles.icon} />
                </button>
              </td>
              <td>
                <button className={styles.centerAlign}>
                <MdDeleteOutline className={styles.icon} />
                </button>
              </td>
            </tr>
            <tr>
              <td className={styles.centerAlign}>Gustavo Ribeiro</td>
              <td className={styles.centerAlign}>bianca</td>
              <td className={styles.centerAlign}>34 996336172</td>
              <td className={styles.centerAlign}>
              <button className={styles.centerAlign} >
                <BsWhatsapp className={styles.icon} />
                </button>
              </td>
              <td>
                <button className={styles.centerAlign}>
                <MdDeleteOutline className={styles.icon} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Admin;
