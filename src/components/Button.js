import React from 'react';
import styles from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';

/* 
  Objeto para identificar as classes no button.module.scss. Não é obrigatório, pois o botão será do mesmo estilo, 
  mas caso fosse um projeto muito grande com muitos botões, seria útil. 
*/

const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

// Disponibiliza um modelo de botão para os botões Adicionar Tarefa em AppHeader e Cancelar em TodoModal.

function Button({ type, variant = 'primary', children, ...rest }) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      // getClasses possui um Array de classes filtradas, que não possuem itens vazios e permite utilizar mais de uma classe de estilo.
      className={getClasses([
        styles.button,
        // Pega o style baseado na variant do botão, que foi declarada no objeto buttonTypes.
        styles[`button--${buttonTypes[variant]}`],
      ])}
      // O operador Spread "espalha" múltiplos elementos de um Array. Permite que expressões expandam o conteúdo de arrays.
      {...rest}
    >
      {children}
    </button>
  );
}

// Função do botão de selecionar entre Todos, Completos e Incompletos. Aparece em AppHeader.js.

function SelectButton({ children, id, ...rest }) {
  return (
    <select
      id={id}
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
      {/* Children recebe o valor em texto passado pelas 3 props option em AppHeader.js e os renderiza de acordo. */}
    </select>
  );
}

export { SelectButton };
export default Button;
