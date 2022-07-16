import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './styles/GlobalStyles.css';
import { store } from './app/store';

/* 
  Aqui é importante adicionar o Provider e vincular o que é a store,
  para poder alcançar os componentes lower level na component tree; 
*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Destaque: O App deve estar envolto do Provider; */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
