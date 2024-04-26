import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createRequest } from "../../api/request";

function CreateRequestPage() {
  const userId = useSelector((state) => state.auth.user._id) || null;

  const [formData, setFormData] = useState({
    company: "",
    priority: -1,
    status: "waiting",
    scale: 100,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createRequest(formData, userId);
  };

  return (
    <div className="flex h-screen border-3 w-full">
      <div className="mt-4 ml-5 w-full">
        <h1 className="text-3xl">Create Request</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label
              htmlFor="company"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              className="text-field block w-1/2 p-2.5"
              placeholder="Company Name"
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="priority"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Priority
            </label>
            <input
              type="text"
              name="priority"
              id="priority"
              className="text-field block w-1/2 p-2.5"
              placeholder="priority"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="filled-btn px-5 py-2.5 text-center mt-5"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRequestPage;
