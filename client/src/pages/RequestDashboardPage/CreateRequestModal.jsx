import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { pushRequestList } from "../../state";
import { Modal } from "flowbite-react";
import { createRequest } from "../../api/request";

function CreateRequestModal({ openCreate, onClose }) {
  const dispatch = useDispatch();
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

    const response = await createRequest(formData, userId);
    if (response) {
      console.log(response);
      dispatch(pushRequestList(response));
      onClose();
    }
  };

  return (
    <Modal show={openCreate} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
}

export default CreateRequestModal;
