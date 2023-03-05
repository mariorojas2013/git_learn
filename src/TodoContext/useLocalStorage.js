import React from "react";

function useLocalStorage(itemName,InitialValue){ 
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [item, setItem] = React.useState(InitialValue);
  
    React.useEffect(() => {
      setTimeout(() => {
        try{
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
        
          if(!localStorageItem){
            localStorage.setItem(itemName, JSON.stringify(InitialValue));
            parsedItem = InitialValue;
          }else{
            parsedItem = JSON.parse(localStorageItem); 
          }
    
          setItem(parsedItem);
          setLoading(false);
        }catch(error){
          setError(error);
        }
      }, 1000);
    });
  
    
    
  
    const saveItem= (newItem) =>{
      try {
        const stringifiedItem = JSON.stringify(newItem);
        localStorage.setItem(itemName,stringifiedItem);
        setItem(newItem);
      } catch (error) {
        setError(error);
      }
    };
  
    return {
      item,
      saveItem,
      loading,
      error,
    };
  
  }

  export {useLocalStorage};