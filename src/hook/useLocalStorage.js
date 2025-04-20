import { useState, useEffect } from "react";
export const useLocalStorage = (key, initialValue) => {
    
    const [storeTask, setStoredTask] = useState(()=>{
        try {
            const taskList = localStorage.getItem(key)
            return taskList ? JSON.parse(taskList) : initialValue
        } catch (error) {
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(storeTask));
    },[key,storeTask])

    return [storeTask, setStoredTask];
}