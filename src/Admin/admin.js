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
                <th scope="col" className={styles.centerAlign}>
                  <img src={pessoas} className={styles.tags} alt="Foto de pessoas"/>
                </th>
                <th scope="col" className={styles.centerAlign}>
                  <img src={animals} className={styles.tags} alt="Animais" />
                </th>
                <th scope="col" className={styles.centerAlign}>
                  <img src={telefone} className={styles.tags} alt="Telefone para contato" />
                </th>
                <th scope="col" className={styles.centerAlign}>Whatsapp</th>
                <th scope="col" className={styles.centerAlign}>Excluir</th>
                <th scope="col" className={styles.centerAlign}>Editar</th>
              </tr>
            </thead>

            {/* Corpo da tabela */}
            <tbody>
              <tr>
                <td className={styles.centerAlign}>Individuo A</td>
                <td className={styles.centerAlign}>Vilma Tereza</td>
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
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css" />
          </table>
        </div>
      </div>
    

  );
}

export default Admin;
