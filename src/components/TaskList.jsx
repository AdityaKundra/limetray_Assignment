import React, { useMemo, useState, useCallback } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskItem from './TaskItem'

const TaskList = () => {
  const {task, dispatch} = useTasks()
  const [filter, setFilter] = useState('All')

  const handleFilter = useMemo(()=>{
    if (filter === 'All') return task
    if (filter === 'Complete') return task.filter(t => t.complete)
    if (filter === 'Pending') return task.filter(t => !t.complete)
  },[task, filter])

  const onToggle = useCallback((taskId)=>{
    dispatch({ type: 'TOGGLE', payload: item.id })
  },[dispatch])

  const onDelete = useCallback((taskId)=>{
    dispatch({ type: 'DELETE', payload: item.id })
  },[dispatch])

  return (
    <>
      {/* Filter Dropdown */}
        <div className='text-left'>
          <label htmlFor="filter" className="font-semibold text-md mr-2">Filter:</label>
          <select id="filter" className="bg-gray-50 border border-none text-gray-900 text-sm rounded-xl p-3 outline-none" onChange={(e)=>setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        {/* Filter Dropdown End */}
        {
          handleFilter.map((item)=>(
            <TaskItem key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
          ))
        }
    </>
  )
}

export default TaskList
