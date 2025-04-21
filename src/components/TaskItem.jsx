import React, { useEffect, useState } from 'react';

const TaskItem = React.memo(({ item, onToggle, onDelete }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isVisible, setIsVisible] = useState(false); 

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
    <div
      className={`flex flex-col md:flex-row justify-between items-center p-3 px-5 my-3 bg-gray-100 border-0 rounded-2xl
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        ${item.complete ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}
        ${isRemoving ? 'opacity-0 -translate-x-10' : ''}
      `}
    >
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
