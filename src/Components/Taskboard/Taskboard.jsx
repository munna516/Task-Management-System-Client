import React, { useContext, useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "../TaskColumn/TaskColumn";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Provider/AuthProvider";

const TaskBoard = () => {
  const { user, successfulToast } = useContext(AuthContext);
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const {
    data: response = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/tasks?email=${user?.email}`
      );
      return data;
    },
  });

  useEffect(() => {
    const groupedTasks = {
      todo: response?.filter((task) => task.category === "todo"),
      inProgress: response?.filter((task) => task.category === "inProgress"),
      done: response?.filter((task) => task.category === "done"),
    };

    setTasks(groupedTasks);
  }, [response]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const { source, destination } = result;

    // Reordering within the same category
    if (source.droppableId === destination.droppableId) {
      const updatedTasks = [...tasks[source.droppableId]];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: updatedTasks,
      }));
    } else {
      // Moving to a different category
      const sourceTasks = [...tasks[source.droppableId]];
      const destinationTasks = [...tasks[destination.droppableId]];
      const [movedTask] = sourceTasks.splice(source.index, 1);

      movedTask.category = destination.droppableId; // Update category

      destinationTasks.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      }));

      const category = destination.droppableId;
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/tasks/${movedTask._id}`,
        { category }
      );

      if (data.modifiedCount) {
        successfulToast(`${movedTask.title} is in ${category}`);
      }
      refetch();
     
    }
  };
  if (isLoading) return <Loading></Loading>;
  return (
    <>
      <div className="flex flex-col items-center p-4 ">
        {/* Add Task Button */}
        <button
          className="btn bg-primary-color hover:bg-primary-color text-white  mb-4"
          onClick={() => document.getElementById("add_task_modal").showModal()}
        >
          + Add Task
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <TaskColumn
            title="To-Do"
            tasks={tasks.todo}
            refetch={refetch}
            id="todo"
          />
          <TaskColumn
            title="In Progress"
            tasks={tasks.inProgress}
            id="inProgress"
            refetch={refetch}
          />
          <TaskColumn
            title="Done"
            tasks={tasks.done}
            refetch={refetch}
            id="done"
          />
        </div>
      </DragDropContext>
      {/* Add Task Modal */}
      <AddTaskModal refetch={refetch} />
    </>
  );
};

export default TaskBoard;
