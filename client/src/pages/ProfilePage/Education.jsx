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
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
  const [gpa, setGPA] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const education = user.education;

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (!school || !major || !degree) {
      toast.error("Please fill out all required fields");
      return;
    }
    const newEducation = await addEducation({
      school: school,
      major: major,
      degree: major,
      gpa: gpa,
      start_year: start,
      end_year: end,
    });

    if (newEducation) {
      dispatch(updateUser(newEducation));
      setSchool("");
      setMajor("");
      setDegree("");
      setGPA(0);
      setStart(0);
      setEnd(0);
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
                onChange={(e) => {
                  setSchool(e.target.value);
                }}
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
                onChange={(e) => {
                  setMajor(e.target.value);
                }}
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
                onChange={(e) => {
                  setDegree(e.target.value);
                }}
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
                onChange={(e) => {
                  setGPA(e.target.value);
                }}
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
                onChange={(e) => {
                  setStart(e.target.value);
                }}
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
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
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
              <ul>
                <li>Major: {item.major}</li>
                <li>Degree: {item.degree}</li>
                <li>GPA: {item.gpa}</li>
                <li>Start Year: {item.start_year}</li>
                <li>End Year: {item.end_year}</li>
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Education;
