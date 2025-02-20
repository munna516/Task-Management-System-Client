import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const AddTaskModal = ({ refetch }) => {
  const { user, successfulToast } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    const email = user?.email;
    const newTask = {
      email,
      title,
      description,
      category: "todo",
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API}/tasks`,
      newTask
    );
    refetch()
    if (response.data.insertedId) {
      successfulToast("Task is Added");
    }
    setTitle("");
    setDescription("");
    document.getElementById("add_task_modal").close(); // Close modal
  };

  return (
    <dialog id="add_task_modal" className="modal">
      <div className="modal-box">
        <h2 className="text-lg font-bold text-primary-color mb-2">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            maxLength="50"
            required
          />
          <textarea
            placeholder="Task Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            maxLength="200"
          />
          <div className="modal-action">
            <button
              type="button"
              className="btn bg-red-500 hover:bg-red-500 text-white"
              onClick={() => document.getElementById("add_task_modal").close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-primary-color hover:bg-primary-color text-white"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddTaskModal;
