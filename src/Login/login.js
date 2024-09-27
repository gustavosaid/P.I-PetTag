import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import styles from '../Login/login.module.css';	
import reactLogo from '../Assets/Images/logo.png';

function Login() {
  
  // const navigate = useNavigate();
  const [credencial, setCredencial] = useState({ username: '', password: '' });

  
  const LoginAdm = (e) => {
    e.preventDefault();

    // Simulação do login, verifica as credenciais
    if (credencial.username === 'admin' && credencial.password === 'admin') {
      alert('Login bem-sucedido');
      //return navigate('/admin.js');
    } else {
      alert('Credenciais inválidas');
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredencial({ ...credencial, [name]: value });
  };

  return (
    <div id="login">
      <form className={styles.card} onSubmit={LoginAdm}>
        <img src={reactLogo} alt="logo pet tag" className={styles.imagem} />

        <div className={styles.cardHeader}>
          <h2>Login</h2>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.cardContentArea}>
            <label>Usuário</label>
            <input
              type="text"
              id="nomes"
              name="username"
              value={credencial.username}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.cardContentArea}>
            <label>Senha</label>
            <input
              type="password"
              id="senha"
              name="password"
              value={credencial.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.cardFooter}>
          <button type="submit" className={styles.submit}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login