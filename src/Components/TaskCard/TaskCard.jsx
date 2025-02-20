import React, { useContext } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const TaskCard = ({ task, index, id, refetch }) => {
  const { errorToast } = useContext(AuthContext);
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
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-primary-color p-3 mb-2 rounded-md shadow-md space-y-2"
        >
          <h3 className="font-bold text-white text-xl">{task.title}</h3>
          <p className="text-sm text-gray-600 text-white">{task.description}</p>
          <div className="flex justify-between items-center">
            <div></div>
            <div className="flex gap-2 text-xl">
              <span className="text-black">
                <FaEdit />
              </span>
              <span onClick={() => handleDelete(id)} className="text-red-600">
                <MdDelete />
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
