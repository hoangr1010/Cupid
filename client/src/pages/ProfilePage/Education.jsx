import { React, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { addEducation } from "./../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../state";
import { useSelector } from "react-redux";

function Education() {
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    school: "",
    major: "",
    degree: "",
    gpa: 0,
    start: 0,
    end: 0,
  });
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
    if (!formState.school || !formState.major || !formState.degree) {
      toast.error("Please fill out all required fields");
      return;
    }
    const newEducation = await addEducation({
      school: formState.school,
      major: formState.major,
      degree: formState.degree,
      gpa: formState.gpa,
      start_year: formState.start,
      end_year: formState.end,
    });

    if (newEducation) {
      dispatch(updateUser(newEducation));
      setFormState({
        school: "",
        major: "",
        degree: "",
        gpa: 0,
        start_year: 0,
        end_year: 0,
      });
      setOpenModal(false);
    }
  };

  return (
    <div className="widget_container">
      <h2 className="font-bold text-lg">Education</h2>
      <Button onClick={() => setOpenModal(true)}>+</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Education</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label for="school" class="block mb-2 text-sm">
                School Name
              </label>
              <input
                type="text"
                id="school"
                name="school"
                onChange={handleChange}
                class="text-field w-full"
                placeholder="School Name"
                required
              />
            </div>
            <div>
              <label for="major" class="block mb-2 text-sm">
                Major
              </label>
              <input
                type="text"
                id="major"
                name="major"
                onChange={handleChange}
                class="text-field w-full"
                placeholder="Major"
                required
              />
            </div>
            <div>
              <label for="degree" class="block mb-2 text-sm">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                name="school"
                onChange={handleChange}
                class="text-field w-full"
                placeholder="Degree"
                required
              />
            </div>
            <div>
              <label for="gpa" class="block mb-2 text-sm">
                GPA
              </label>
              <input
                type="number"
                id="gpa"
                name="gpa"
                onChange={handleChange}
                class="text-field w-full"
                placeholder="GPA"
              />
            </div>
            <div>
              <label for="start" class="block mb-2 text-sm">
                Start Year
              </label>
              <input
                type="number"
                id="start"
                name="start"
                onChange={handleChange}
                class="text-field w-full"
                placeholder="Start Year"
              />
            </div>
            <div>
              <label for="end" class="block mb-2 text-sm">
                End Year
              </label>
              <input
                type="number"
                id="end"
                name="end"
                onChange={handleChange}
                class="text-field w-full"
                placeholder="End Year"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="filled-btn"
            onClick={() => {
              handleSubmit();
              setOpenModal(false);
            }}
          >
            Save
          </Button>
          <Button
            className="filled-btn"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {education.length <= 0 ? (
        <p>Please update your education</p>
      ) : (
        <>
          {education.map((item, index) => (
            <div key={index}>
              <h3>{item.school}</h3>
              {/* <ul>
                <li>Major: {item.major}</li>
                <li>Degree: {item.degree}</li>
                <li>GPA: {item.gpa}</li>
                <li>Start Year: {item.start_year}</li>
                <li>End Year: {item.end_year}</li>
              </ul> */}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Education;
