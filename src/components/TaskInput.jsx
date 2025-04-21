import {useState} from 'react'
import { useTasks } from '../context/TaskContext'

const TaskInput = () => {
    const [task, setTask] = useState('')
    const [error, setError] = useState('')
    const {dispatch} = useTasks()

    const handleSubmit = (e) => {
        e.preventDefault()
        (task.trim()) !=='' ? dispatch({type:'ADD', payload:{id:Date.now(), task, complete: false} })  : setError('Please Enter Task!')
        setTask('')
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        (task.trim()) !=='' ? dispatch({type:'ADD', payload:{id:Date.now(), task, complete: false} })  : setError('Please Enter Task!')
        setTask('');
    }

  return (
        <>
            <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row items-center justify-center">
                <input type='text' className='p-4 my-2 md:m-4 border-2 text-black outline-0 font-xl font-bold md:rounded-xl md:rounded-r-none md:mr-1 w-full md:w-auto dark:bg-neutral-800 dark:text-white' value={task} placeholder='Add a New Task !' onChange={(e)=>setTask(e.target.value)}/>
                <button type='submit' className='border-2 font-semibold font-xl p-4 md:rounded-xl md:rounded-l-none cursor-pointer w-full md:w-auto mb-4 md:mb-0 dark:bg-neutral-800 dark:text-white'>Add</button>
            </form>
            <div>{error}</div>
        </>
  )
}

export default TaskInput
