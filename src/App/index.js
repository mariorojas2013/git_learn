//import logo from './logo.svg';
import React from 'react';
import { TodoProvider } from '../TodoContext';
import './App.css';
import { AppUI } from './AppUI';

// const defaultTodos = [
//   {text: 'Cortar cebolla', completed: true},
//   {text: 'Tomar el ...', completed: false},
//   {text: 'llorar con la...', completed: true},
//   {text: 'lalalala', completed: false},
// ];



function App() {

  return (
    <TodoProvider>
        <AppUI />
    </TodoProvider>
    
  );
}

export default App;
