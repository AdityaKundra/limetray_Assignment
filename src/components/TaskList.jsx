import React, { useMemo, useState, useCallback } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskItem from './TaskItem'
import {closestCorners, DndContext} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


const TaskList = () => {
  const { task, dispatch } = useTasks()
  const [filter, setFilter] = useState('All')

  const handleFilter = useMemo(() => {
    if (filter === 'All') return task
    if (filter === 'Complete') return task.filter(t => t.complete)
    if (filter === 'Pending') return task.filter(t => !t.complete)
  }, [task, filter])

  const onToggle = useCallback((taskId) => {
    dispatch({ type: 'TOGGLE', payload: taskId })
  }, [dispatch])
  
  const onDelete = useCallback((taskId) => {
    dispatch({ type: 'DELETE', payload: taskId })
  }, [dispatch])

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
  
    const oldIndex = task.findIndex(t => t.id === active.id);
    const newIndex = task.findIndex(t => t.id === over.id);
  
    const reorderedTasks = [...task];
    const [movedItem] = reorderedTasks.splice(oldIndex, 1);
    reorderedTasks.splice(newIndex, 0, movedItem);
  
    dispatch({ type: 'REORDER', payload: reorderedTasks });
  };

  return (
    <>
      {/* Filter Dropdown */}
      <div className='text-left w-full mb-4'>
        <label htmlFor="filter" className="font-semibold text-md mr-2 dark:text-black">Filter:</label>
        <select id="filter" className="bg-gray-100 dark:bg-neutral-100 border border-none text-gray-900 text-sm rounded-xl p-3 outline-none w-full md:w-auto" onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      {/* Filter Dropdown End */}
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <SortableContext items={task} strategy={verticalListSortingStrategy}>
          {handleFilter.map((item, index) => (
            <TaskItem key={item.id}
              item={item}
              onToggle={onToggle}
              onDelete={onDelete}
            />
        ))}
        </SortableContext>
      </DndContext>
    </>
  )
}

export default TaskList
