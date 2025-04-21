import React, { useMemo, useState, useCallback } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskItem from './TaskItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = () => {
  const {task, dispatch} = useTasks()
  const [filter, setFilter] = useState('All')

  const handleFilter = useMemo(()=>{
    if (filter === 'All') return task
    if (filter === 'Complete') return task.filter(t => t.complete)
    if (filter === 'Pending') return task.filter(t => !t.complete)
  },[task, filter])

  const onToggle = useCallback((taskId)=>{
    dispatch({ type: 'TOGGLE', payload: taskId })
  },[dispatch])

  const onDelete = useCallback((taskId)=>{
    dispatch({ type: 'DELETE', payload: taskId })
  },[dispatch])

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;
  
    const reorderedTasks = [...task];
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);
  
    dispatch({ type: 'REORDER', payload: reorderedTasks });
  };
    const onDragStart = (result)=>{
    console.log(`Drag started:`,result)
  }
  return (
    <>
      {/* Filter Dropdown */}
        <div className='text-left w-full mb-4'>
          <label htmlFor="filter" className="font-semibold text-md mr-2 dark:text-black">Filter:</label>
          <select id="filter" className="bg-gray-100 dark:bg-neutral-100 border border-none text-gray-900 text-sm rounded-xl p-3 outline-none w-full md:w-auto" onChange={(e)=>setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        {/* Filter Dropdown End */}
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable
            droppableId="taskList"
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
          >
            {(provided) => (
              <div
                className="w-full h-full relative"
                {...provided.droppableProps}
                ref={provided.innerRef} 
              >
                {handleFilter.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided) => (
                      <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-3"
                          style={provided.draggableProps.style}
                        >
                        <TaskItem
                          item={item}
                          onToggle={onToggle}
                          onDelete={onDelete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder} 
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </>
  )
}

export default TaskList
