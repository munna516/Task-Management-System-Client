import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../TaskCard/TaskCard";

const TaskColumn = ({ title, tasks, id }) => {
  return (
    <div className="bg-slate-100 border border-primary-color bg-red p-4 rounded-md shadow-md mb-8">
      <h2 className="text-xl font-extrabold mb-4 text-primary-color">{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[300px]"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
