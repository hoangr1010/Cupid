import { React, useState } from "react";
import { Modal } from "flowbite-react";
import { addExperience } from "./../../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../../state";
import { useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import ExperienceCard from "./ExperienceCard";
import ExperienceForm from "../Forms/ExperienceForm";
import { PiBagSimpleFill } from "react-icons/pi";
import { parseObject } from "../../../utils/user";

function Experience() {
  const user = useSelector((state) => state.auth.user);
  const experience = user.experience;
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const initialFormValue = {
    company: "",
    position: "",
    location: "",
    type: "",
    start_m: "",
    start_y: 0,
    end_m: "",
    end_y: 0,
    current: false,
    description: "",
  };
  const [formState, setFormState] = useState(initialFormValue);

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
    if (!formState.company) {
      toast.error("Company in Experience is required");
      return;
    }
    if (!formState.location) {
      toast.error("Location in Experience is required");
      return;
    }
    if (!formState.position) {
      toast.error("Position in Experience is required");
      return null;
    }
    if (!formState.type) {
      toast.error("Type in Experience is required");
      return null;
    }
    if (!formState.start_m) {
      toast.error("Start month in Experience is required");
      return null;
    }
    if (!formState.start_y) {
      toast.error("Start year in Experience is required");
      return null;
    }
    if (!formState.end_m) {
      toast.error("End month in Experience is required");
      return null;
    }
    if (!formState.end_y) {
      toast.error("End year in Experience is required");
      return null;
    }
    setIsSubmitLoading(true);
    const parseExperienceObject = parseObject(initialFormValue, formState);
    const newExperience = await addExperience(parseExperienceObject);

    if (newExperience) {
      dispatch(updateUser(newExperience));
      setFormState(initialFormValue);
      setOpenModal(false);
    }
    setIsSubmitLoading(false);
  };

  return (
    <div className="w-2/3">
      <div className="flex justify-between items-center text-primaryDark">
        <div className="text-3xl font-bold">
          <h2>Work Experience</h2>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="font-bold hover:text-primary transition-all"
        >
          <MdAdd size={25}/>
        </button>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <div className="flex gap-2 items-center text-primaryDark">
            <PiBagSimpleFill size={25} />
            <h2 className="font-bold text-2xl">Add Experience</h2>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ExperienceForm
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
      {experience.length <= 0 ? (
        <p className="font-semibold text-sm pl-2">No items added</p>
      ) : (
        <div className="flex flex-col gap-4">
          {[...experience]
            .sort((a, b) => b.end_y - a.end_y)
            .map((item, index) => (
              <div key={index}>
                <ExperienceCard experience={item} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Experience;
