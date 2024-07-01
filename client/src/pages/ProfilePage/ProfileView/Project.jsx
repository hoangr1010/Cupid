import { React, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { addProject } from "./../../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../../state";
import { useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";
import ProjectCard from "./ProjectCard";
import ProjectForm from "../Forms/ProjectForm";
import { parseObject } from "../../../utils/user";

function Project() {
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  const project = user.project;
  const initialFormState = {
    name: "",
    start_m: "",
    start_y: 0,
    end_m: "",
    end_y: 0,
    current: false,
    description: "",
    link: "",
  };
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let parsedValue = value;

    if (type === "number") {
      parsedValue = parseInt(value, 10);
    }

    setFormState({
      ...formState,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async () => {
    if (!formState.name) {
      toast.error("Project name in Project is required");
      return null;
    }
    if (!formState.description) {
      toast.error("Project description in Project is required");
      return null;
    }
    setIsSubmitLoading(true);

    const parseProjectObject = parseObject(initialFormState, formState);
    const newUser = await addProject(parseProjectObject);

    if (newUser) {
      dispatch(updateUser(newUser));
      setFormState(initialFormState);
      setOpenModal(false);
    }
    setIsSubmitLoading(false);
  };

  return (
    <div className="w-2/3">
      <div className="flex justify-between items-center text-primaryDark">
        <div className="text-3xl font-bold">
          <h2>Project</h2>
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="text-3xl font-bold hover:text-primary"
          >
            <IoAdd />
          </button>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Project</Modal.Header>
        <Modal.Body>
          <ProjectForm
            formState={formState}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Modal.Body>
        <Modal.Footer>
          <section className="w-full flex justify-end gap-2">
            <button
              className="outline-btn btn-padding"
              color="gray"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              disabled={isSubmitLoading}
              className="filled-btn btn-padding"
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </button>
          </section>
        </Modal.Footer>
      </Modal>
      {project.length <= 0 ? (
        <p className="font-semibold text-sm pl-2">No items added</p>
      ) : (
        <div className="flex flex-col gap-4">
          {project.map((item, index) => (
            <div key={index}>
              <ProjectCard project={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Project;
