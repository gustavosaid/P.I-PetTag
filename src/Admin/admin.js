import React from "react";
import styles from '../Admin/Admin.module.css';
import wzap  from '../Assets/Images/whatsapp.png';
import reactLogo from '../Assets/Images/logo.png';


function Admin() {
  return (
    <div className={styles.corpo}>
      <img src={reactLogo} alt="logo pet tag" className={styles.logo} />
      <div className={styles.headersConteudo}>
    
        <table className={styles.table}>
          <tr>
            <th scope="col" align="left">Responsavel </th>
            <th scope="col" align="center">Nome do Pet</th>
            <th scope="col" align="center">Telefone</th>
          </tr>
          <td align="left">Laura Vitoria</td>
          <td align="center">Vilma Tereza</td>
          <td align="center">34 996390833</td>
          <td align="center">
            <a href="https://www.youtube.com/">
              <img src={wzap} width={25} height={25} alt="wzap" />
            </a>
          </td>
        </table>
      </div>
    </div>
  );
}

export default Admin;