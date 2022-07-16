import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateFilterStatus } from '../slices/todoSlice';

// Exibe os botões do app como o Adicionar Tarefa e Filtro por Status(TODOS, COMPLETOS e INCOMPLETOS) e o todoModal, onde digita-se o texto e seleciona-se o status.

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false); // Destaque: estado como false por default, caso contrário, a caixa de texto apareceria sempre que iniciar.

  const initialFilterStatus = useSelector((state) => state.todo.filterStatus); // useSelector acessa o estado do status da tarefa na store e o retorna seguindo o parâmetro.

  const [filterStatus, setFilterStatus] = useState(initialFilterStatus); // Para usar o botão que filtra pelo status, aqui fica o seu estado inicial e como atualizá-lo.
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    // Essa função cria a mudança do filtro de status.
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Adicionar Tarefa
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">Todos</option>
        <option value="incomplete">Incompletos</option>
        <option value="complete">Completos</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
