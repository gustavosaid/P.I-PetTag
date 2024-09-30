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
          {/* Cabeçalho da tabela */}
          <thead>
            <tr>
              <th scope="col" className={styles.leftAlign}>Responsável</th>
              <th scope="col" className={styles.centerAlign}>Nome do Pet</th>
              <th scope="col" className={styles.centerAlign}>Telefone</th>
              <th scope="col" className={styles.centerAlign}>Ações</th>
            </tr>
          </thead>
          
          {/* Corpo da tabela */}
          <tbody>
            <tr>
              <td className={styles.centerAlign}>Laura Vitoria</td>
              <td className={styles.centerAlign}>Vilma Tereza</td>
              <td className={styles.centerAlign}>34 996390833</td>
              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/">
                  <img src={wzap} width={25} height={25} alt="wzap" />
                </a>
              </td>
            </tr>
            <tr>
              <td className={styles.centerAlign}>Gustavo Ribeiro</td>
              <td className={styles.centerAlign}>bianca</td>
              <td className={styles.centerAlign}>34 996336172</td>
              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/">
                  <img src={wzap} width={25} height={25} alt="wzap" />
                </a>
              </td>
            </tr>
            <tr>
              <td className={styles.centerAlign}>Tiago</td>
              <td className={styles.centerAlign}>Toddy</td>
              <td className={styles.centerAlign}>34 999999999</td>
              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/">
                  <img src={wzap} width={25} height={25} alt="wzap" />
                </a>
              </td>
            </tr>
            <tr>
              <td className={styles.centerAlign}>Kauã</td>
              <td className={styles.centerAlign}>Lili</td>
              <td className={styles.centerAlign}>34 8888888888</td>
              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/">
                  <img src={wzap} width={25} height={25} alt="wzap" />
                </a>
              </td>
            </tr>
            <tr>
              <td className={styles.centerAlign}>Lucas</td>
              <td className={styles.centerAlign}>negão</td>
              <td className={styles.centerAlign}>34 77777777777</td>
              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/">
                  <img src={wzap} width={25} height={25} alt="wzap" />
                </a>
              </td>
            </tr>
            <tr>
              <td className={styles.centerAlign}>Luis henrique</td>
              <td className={styles.centerAlign}>meg</td>
              <td className={styles.centerAlign}>34 66666666</td>
              <td className={styles.centerAlign}>
                <a href="https://www.youtube.com/">
                  <img src={wzap} width={25} height={25} alt="wzap" />
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
