import React, { useEffect, useState } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = React.memo(({ item, onToggle, onDelete }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isVisible, setIsVisible] = useState(false); 
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: item.id});

  const style={
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isRemoving ? 0 : isVisible ? item.complete ? 0.4 : 1 : 0,
  }
  // Trigger fade-in animation
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100); 
    return () => clearTimeout(timeout);
  }, []);

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onDelete(item.id);
    }, 300); 
  };

  return (
    <div ref={setNodeRef}
      className={`flex flex-col md:flex-row justify-between items-center p-3 px-5 my-3 bg-gray-100  border-0 rounded-2xl transition-all duration-300 ease-in-out transform
        ${item.complete ? 'scale-95' : 'scale-100'}
        ${isVisible ? 'translate-y-0' : 'translate-y-5'}
        ${isRemoving ? '-translate-x-10' : ''}
      `}
      style={style}
    >
    <div {...attributes} {...listeners} className="cursor-move mr-3">⋮⋮</div>
      <div className="flex items-center text-left w-full md:w-8/12">
        <input
          type="checkbox"
          className="mr-2"
          checked={item.complete}
          onChange={() => onToggle(item.id)}
        />
        <span className={`break-all ${item.complete ? 'line-through' : ''}`}>
          {item.task}
        </span>
      </div>

      <div
        className="cursor-pointer w-full mt-2 md:mt-0 md:w-3/12 text-center bg-red-500 text-white p-2 rounded"
        
        onClick={handleDelete}
      >
        Delete
      </div>
    </div>
  );
});

export default TaskItem;
