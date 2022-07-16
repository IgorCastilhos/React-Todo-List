import { createSlice } from '@reduxjs/toolkit';

/* 
  É necessário passar um valor inicial para que o app não apague tudo quando a página for atualizada, então:
  -Quando o app iniciar, pegaremos os todos do Local Storage,
  -getItem retornará os valores associados à string 'todoList',
  -Se a todoList existir no Local Storage, ela será retornada através do método Parse em forma de objeto.
*/

const getInitialTodos = () => {
  const localTodoList = window.localStorage.getItem('todoList');
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodos(), // Declarando a função que armazena a todo list.
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    /*
      addTodo: É um Reducer em que o payload receberá um novo título e status, o .push irá adicionar o que tem no payload para o state.todoList,
      e então a todoList é verificada novamente e atualizada no Local Storage. Senão, será definida uma nova todoList com um array contendo só um objeto interno.
   */

    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr)); // Atualiza o novo todo list no Local Storage mais uma vez.
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },

    /*
      updateTodo: busca a todoList no LocalStorage, se ela existir, é criado um array com ela através do Parse. 
      Para cada todo, é verificado se eles são iguais aos que estão em action.payload.id, se forem, eles serão atualizados para o novo valor.
      No final, o LocalStorage transforma o array todoList em um objeto e o transfere para um novo array e atualiza o estado da todoList.
   */
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },

    /* 
      deleteTodo: busca a todoList no LocalStorage e se tiver uma todoList, então todoListArr passa a receber o valor dessa todoList em forma de Array, 
      através do método .parse. Cada um dos itens todo's é verificado, se o id do todo for igual ao informado no .payload, ele será deletado.
    */
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr)); // Agora atualizamos a todoList no Local Storage
        state.todoList = todoListArr; // O array do todoList será o novo array que veio depois do Splice;
      }
    },
    /*
      updateFilterStatus: o que estiver no payload, será definido como o estado do filterStatus. 
    */
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
