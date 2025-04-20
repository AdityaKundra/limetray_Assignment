import React from 'react'
import TaskInput from './TaskInput'
import TaskList from './TaskList'

const Todo = () => {
  return (
    <div className='flex items-center justify-center flex-row w-screen h-screen'>
        <div className='bg-blue-400 p-10 text-center rounded-md'>
            <h2 className='text-white text-xl font-bold'>Manage Task !</h2>
            <TaskInput/>
            <TaskList/>
        </div>
    </div>
  )
}

export default React.memo(Todo)
