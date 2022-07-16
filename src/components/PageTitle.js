import React from 'react';
import styles from '../styles/modules/title.module.scss';

// O parâmetro children recebe um valor em forma de texto em App.js, no caso "Teste React" e é renderizado aqui.
function PageTitle({ children }) {
  return <p className={styles.title}>{children}</p>;
}

export default PageTitle;
