import React, { useEffect, useState } from 'react'
import TaskInput from './TaskInput'
import TaskList from './TaskList'

const Todo = () => {

  const [darkMode, setDarkMode] = useState(() => (localStorage.getItem('theme') == true))
  
  useEffect(()=>{
    localStorage.setItem('theme', darkMode)
  },[darkMode])

  return (
    <div className={`${darkMode && `dark` } flex items-center justify-center flex-col md:flex-row w-screen min-h-screen p-4 bg-blue-400 dark:bg-neutral-800`}>
      <div className='bg-white p-6 md:p-10 text-center rounded-2xl w-full max-w-xl'>
        <h2 className='text-blue-400 text-xl font-bold dark:text-black'>Manage Task !</h2>
        <TaskInput />
        <TaskList />
      </div>
      <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute right-10 bottom-10 p-2 rounded-full bg-black dark:bg-white text-white dark:text-black w-10 h-10 text-xs cursor-pointer"
        >
          {!darkMode ? 'DRK' : 'LHT'}
        </button>
    </div>
  )
}

export default React.memo(Todo)
