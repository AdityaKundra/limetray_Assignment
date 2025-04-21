import { useEffect, createContext, useContext, useReducer } from "react";
import {useLocalStorage} from '../hook/useLocalStorage'

const TaskContext  = createContext()

const reducer = (state, action)=>{
    switch(action.type){
        case 'ADD':
            return [...state, action.payload]
        case 'TOGGLE':
            return state.map(task =>
                task.id === action.payload ? { ...task, complete: !task.complete } : task
              );
        case 'DELETE':
            return state.filter(task=>(
                task.id !== action.payload
            ))
        case 'REORDER':
            return action.payload;    
        default:
            return state;
    }
}


export const TaskProvider = ({children})=>{
    const [storeTask, setStoredTask] = useLocalStorage('task',[])
    const [task, dispatch] = useReducer(reducer, storeTask)

    useEffect(()=>{
        setStoredTask(task)
    },[task, setStoredTask])

    return (
        <TaskContext.Provider value={{task, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => useContext(TaskContext);
