import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-primary-color p-3 mb-2 rounded-md shadow-md "
        >
          <h3 className="font-bold text-white">{task.title}</h3>
          <p className="text-sm text-gray-600 text-white">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
