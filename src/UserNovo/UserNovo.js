import React from 'react';
import styles from '../UserNovo/UserNovo.module.css'


function UserNovo() {



    return (
        <form className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardContentArea}>
                    <h2>Atualizar Dados</h2>
                </div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardContentArea}>
                    <label>Nome Responsavel</label>
                    <input
                        type="text"
                        id="nomes"
                        name="username"
                    />
                </div>

                <div className={styles.cardContentArea}>
                    <label>Nome do Pet</label>
                    <input
                        type="text"
                        id="nomePet"
                        name="username"

                    />
                </div>
                <div className={styles.cardContentArea}>
                    <label>Telefone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        minlength="8"
                        maxlength="11"
                    />
                </div>
            </div>

            <div className={styles.cardFooter}>
                <button type="submit" className={styles.submit}>
                    Salvar
                </button>
            </div>

        </form>
    );
}
export default UserNovo;