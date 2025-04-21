import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Test = () => {
  const initialData = [
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily.johnson@abccorporation.com"
    },
    {
      id: 2,
      name: "Michael Williams",
      email: "michael.williams@xyzcorp.com"
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@acmeinc.com"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@techsolutions.com"
    },
    {
      id: 5,
      name: "William Brown",
      email: "william.brown@globalmfg.com"
    }
  ];

  const [items, setItems] = useState(initialData);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <div className="p-6">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable"
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-red-100 p-4 rounded-lg"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-3"
                      style={{
                        ...provided.draggableProps.style,
                        // Optional: Add smoother drag experience
                        boxShadow: snapshot.isDragging ? "0 4px 10px rgba(0,0,0,0.2)" : "none"
                      }}
                    >
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p>{item.email}</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Test;
