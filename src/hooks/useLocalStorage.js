import { useState } from 'react'

function useLocalStorage(key, initialValue) {
    //state to store our value
    //pass initial state function to useState so logic is only executed once

    const [storedValue, setStoredValue] = useState(() =>{
        try{
            //get from local storage by key
            const item = window.localStorage.getItem(key);
            //parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        }catch(ex){
            console.log(ex);
            return initialValue;
        }
    })
   

    const setValue = (value) =>{
        try{
            //allow value to be a function so we have same API as useState
            console.log(storedValue);
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            //save state
            setStoredValue(valueToStore);
            //save to local  
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }catch(ex){
            console.log(ex);
        }
    }

    return [storedValue, setValue];
}

export default useLocalStorage
