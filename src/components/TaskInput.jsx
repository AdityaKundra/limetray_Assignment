import {useState} from 'react'
import { useTasks } from '../context/TaskContext'

const TaskInput = () => {
    const [task, setTask] = useState('')
    const [error, setError] = useState('')
    const {dispatch} = useTasks()

    const handleSubmit =  (e)=>{
        e.preventDefault()
        task.trim() !=='' ? dispatch({type:'ADD', payload:{id:Date.now(), task, complete: false} }) : setError('Error')
    }

  return (
        <form onSubmit={handleSubmit}>
            <input type='text' className='p-4 m-6 bg-white text-black outline-0 font-xl font-bold mr-1  rounded-xl rounded-r-none' value={task} placeholder='Add a New Task !' onChange={(e)=>setTask(e.target.value)}/>
            <button type='submit' className='bg-white font-semibold font-xl p-4 rounded-xl rounded-l-none cursor-pointer '>Add</button>
            <span>{error}</span>
        </form>
  )
}

export default TaskInput
