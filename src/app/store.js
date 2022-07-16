import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';

/* 
  Neste projeto, há um único reducer, então ele será passado nessa constante. 
  No todoSlice, o reducer é exportado como 'reducer' e aqui ele é renomeado todoReducer, além de ser registrado na store.
*/

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
