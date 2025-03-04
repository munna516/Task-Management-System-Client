import React, { useContext, useState, useRef } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { format } from "date-fns";

const TaskCard = ({ task, index, id, refetch }) => {
  const { errorToast, successfulToast } = useContext(AuthContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const editModalRef = useRef(null); // Reference to modal

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API}/tasks/${id}`
        );
        if (data.deletedCount) {
          errorToast("Task is deleted");
          refetch();
        }
      }
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value; // Get selected category

    const updatedTask = { title, description, category };
    console.log(updatedTask, id);

    const { data } = await axios.put(
      `${import.meta.env.VITE_API}/tasks/${id}`,
      updatedTask
    );

    if (data.modifiedCount) {
      successfulToast(`Task ${title} is updated`);
    }
    refetch();
    e.target.reset();
    editModalRef.current.close(); // Close modal
  };

  return (
    <>
      {/* Edit Task Modal */}
      <dialog id="edit_task_modal" ref={editModalRef} className="modal">
        <div className="modal-box">
          <h2 className="text-lg font-bold text-primary-color mb-2">
            Update Task
          </h2>
          {selectedTask && (
            <form onSubmit={handleEdit} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={selectedTask.title}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, title: e.target.value })
                }
                name="title"
                className="input input-bordered w-full"
                maxLength="50"
                required
              />
              <textarea
                placeholder="Task Description (Optional)"
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
                name="description"
                className="textarea textarea-bordered w-full"
                maxLength="200"
              />
              {/* Dropdown for Category */}
              <select
                name="category"
                value={selectedTask.category}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, category: e.target.value })
                }
                className="select select-bordered w-full"
                required
              >
                <option value="todo">To-do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => editModalRef.current.close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-primary-color hover:bg-primary-color text-white"
                >
                  Update Task
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {/* Draggable Task Card */}

      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-3 mb-2 rounded-md shadow-md space-y-2 ${
              task.category === "todo"
                ? "bg-primary-color"
                : task.category === "inProgress"
                ? "bg-yellow-500"
                : task.category === "done"
                ? "bg-green-500"
                : ""
            }`}
          >
           
            <h3
              className={`font-bold text-xl ${
                task.category === "inProgress" ? "text-black" : "text-white"
              }`}
            >
              {task.title}
            </h3>
            <p
              className={`text-sm ${
                task.category === "inProgress" ? "text-black" : "text-white"
              }`}
            >
              {task.description}
            </p>

            <div className="flex justify-between items-center">
            
              <div
                className={`text-sm ${
                  task.category === "inProgress" ? "text-black" : "text-white"
                }`}
              >
                {format(new Date(task.timestamp), "dd / MM / yyyy")}
              </div>
              <div
                className={`bg-white px-2 py-1 rounded-2xl text-sm font-bold ${
                  task.category === "todo"
                    ? "text-primary-color"
                    : task.category === "inProgress"
                    ? "text-black"
                    : task.category === "done"
                    ? "text-green-500"
                    : ""
                }`}
              >
                {task.category}
              </div>
              <div className="flex gap-2 items-center">
                <span
                  onClick={() => {
                    setSelectedTask(task); // Set the selected task
                    editModalRef.current.showModal(); // Open modal
                  }}
                  className="text-black text-xl cursor-pointer"
                >
                  <FaEdit />
                </span>
                <span
                  onClick={() => handleDelete(id)}
                  className="text-red-600 text-xl cursor-pointer"
                >
                  <MdDelete />
                </span>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default TaskCard;
