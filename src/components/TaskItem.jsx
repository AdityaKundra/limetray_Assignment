import React from 'react';

const TaskItem = React.memo(({item, onToggle, onDelete}) => {
  return (
      <div className="flex justify-between items-center p-3 my-3 bg-white font-black transition-opacity duration-500 ease-in-out opacity-100" style={{ opacity: item.complete ? 0.5 : 1 }}>
        {/* Task Name Section */}
        <div className="flex items-center w-full md:w-8/12">
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

        {/* Delete Button Section */}
        <div
          className="cursor-pointer w-1/4 md:w-3/12 text-center bg-red-500 text-white p-2 rounded"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </div>
      </div>
  );
})

export default TaskItem;
