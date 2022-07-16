import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';

/* Função Principal - Essa função é o component que renderiza a UI do projeto. */
function App() {
  return (
    <>
      <div className="container">
        {/* O parâmetro Children é fornecido daqui em forma de texto para o PageTitle.js; */}
        <PageTitle>Teste React</PageTitle>
        <div className={styles.app__wrapper}>
          {/* Component AppHeader exibe os botões e o modalTodo(onde se escreve o Todo) */}
          <AppHeader />
          {/* Component AppContent exibe a Lista de Todas as Tarefas ou caso não exista nenhuma, a mensagem "Sem tarefas" */}
          <AppContent />
        </div>
      </div>
      <Toaster // React-hot-toast exibe mensagens sobre os to-do's como adicionado, atualizado e apagado com sucesso;
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;
