import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

// Efeito de carregamento na Interface
const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};
/*   
   As props modalOpen e setModalOpen serão as props usadas para atribuir estado e atualizar o estado;
   Função TodoModal: Gera a caixa de texto com a opção de adicionar, excluir e definir status ao clicar em Adicionar Tarefa ou em uma tarefa existente.
*/
function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  // Realiza efeitos colaterais na UI caso o parâmetro type seja do tipo update e esteja dentro do item todo.
  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir o refresh.
    if (title === '') {
      // Se o título estiver vazio, o toast exibirá a mensagem de erro.
      toast.error('Por favor insira um título');
      return;
    }
    if (title && status) {
      // Se estiver recebendo um título e status, então será despachada a ação addTodo.
      if (type === 'add') {
        dispatch(
          // O dispatch action passará os payloads id, title, status e time.
          addTodo({
            id: uuid(), // uuid: pacote que gera id's aleatórias.
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Todo adicionado com sucesso'); // Alerta de confirmação do toast.
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success('Todo atualizado com sucesso');
        } else {
          toast.error('Nenhuma mudança foi feita');
          return;
        }
      }
      setModalOpen(false);
      // A caixa de texto é fechada após finalizar a operação.
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && ( // Se o modalOpen for true, o app irá mostrar a caixa de texto, senão, ele não precisa ser renderizado.
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Adicionar' : 'Atualizar'} Todo
              </h1>
              <label htmlFor="title">
                Título
                <input
                  type="text"
                  id="title"
                  value={title} // Esse value contém o título inserido após a inclusão de um to-do;
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incompleto</option>
                  <option value="complete">Completo</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {/* Esse é o botão do form para adicionar ou atualizar um todo, ele recebe a prop type submit.
                  O elemento JSX type verifica se ele é igual ao adicionar ou atualizar, mudando o texto do botão conforme o caso; */}
                  {type === 'add' ? 'Adicionar' : 'Atualizar'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  {/* onClick: fechará a caixa de texto, tornando setModalOpen false */}
                  Cancelar
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
