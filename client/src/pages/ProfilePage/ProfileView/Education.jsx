import { React, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { addEducation } from "./../../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../../state";
import { useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";
import EducationCard from "./EducationCard";
import EducationForm from "../Forms/EducationForm";
import { parseObject } from "../../../utils/user";
function Education() {
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  const initialFormState = {
    school: "",
    major: "",
    degree: "",
    gpa: 0,
    start: 0,
    end: 0,
  };
  const [formState, setFormState] = useState(initialFormState);
  const education = user.education;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(type);

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
    if (!formState.school) {
      toast.error("School in Education is required");
      return null;
    }
    if (!formState.major) {
      toast.error("Major in Education is required");
      return null;
    }
    if (!formState.degree) {
      toast.error("Degree in Education is required");
      return null;
    }
    setIsSubmitLoading(true);

    const parseEducationObject = parseObject(initialFormState, formState);

    const newUser = await addEducation(parseEducationObject);
    console.log(newUser);
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
          <h2>Education</h2>
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
        <Modal.Header>Add Education</Modal.Header>
        <Modal.Body>
          <EducationForm
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
      {education.length <= 0 ? (
        <p className="font-semibold text-sm pl-2">No items added</p>
      ) : (
        <div className="flex flex-col gap-4">
          {[...education]
            .sort((a, b) => b.end_y - a.end_y)
            .map((item, index) => (
              <div key={index}>
                <EducationCard education={item} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Education;
