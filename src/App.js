import React from 'react';
import styles from './App.module.css';
import logo from './Assets/Images/logo.png';

function App() {
  return (
    <div className="App">
      
      <div className={styles.preto}>
        <img src={logo} alt="Logo da Pet-Tag"className={styles.logo} />
      </div>
      
      <form>
        <label>
          Nome:
          <input type='text' name= 'nome' />
        </label>

        E-mail
        <input type='email' placeholder='E-mail'/>
      </form>
    </div>
  );
}

export default App;
