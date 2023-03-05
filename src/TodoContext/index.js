import React from "react";
import { useLocalStorage } from "./useLocalStorage";
const TodoContext = React.createContext();

function TodoProvider(props){
    const {
        // coloca : como se llamaba antes
        item: todos,
        saveItem :saveTodos, 
        loading,
        error
      } = useLocalStorage('TODOS_V1',[]);
    
      const  [searchValue, setSearchValue] = React.useState('');
      const  [openModal, setOpenModal] = React.useState(false);
                                            //! diferente - !! si es verdadero
      const completedTodos = todos.filter(todo => !!todo.completed ).length;
      const totalTodos = todos.length;
    
      let searchedTodos = [];
  
      
     
      if(!searchValue.length >= 1){
        searchedTodos = todos;
      } else{
        searchedTodos = todos.filter(todo =>{
          const todoText = todo.text.toLowerCase();
          const searchText = searchValue.toLowerCase();
          //devuelva los items que  incluyen lo que se escribe 
          return todoText.includes(searchText);
        })
        
      }


      const addTodo = (text) => {
      const newTodos = [...todos];
        newTodos.push({
          completed : false,
          text : text
        });
      saveTodos(newTodos);
      }
    
      
      const completeTodo = (text) => {
                                         //cada item => si el text del item es igual al que ingresaron
        const todoIndex = todos.findIndex(todo => todo.text === text);
        // inyectando los nuevos items
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
      }
    
      const deleteTodo = (text) => {
                                       //cada item => si el text del item es igual al que ingresaron
        const todoIndex = todos.findIndex(todo => todo.text === text);
        // inyectando los nuevos items
        const newTodos = [...todos];
        newTodos.splice(todoIndex,1);
        saveTodos(newTodos);
        }
      



    return (
        <TodoContext.Provider
        value ={{
          loading,
          error,
          totalTodos,
          completedTodos,
          searchValue,
          setSearchValue,
          addTodo,
          searchedTodos,
          completeTodo,
          deleteTodo,
          openModal,
          setOpenModal
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export {TodoContext, TodoProvider};
 