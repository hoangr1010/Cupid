import {
  React,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button, Modal } from "flowbite-react";
import { addPortfolio } from "./../../api/user";
import { useDispatch } from "react-redux";
import { updateUser } from "./../../state";
import { useSelector } from "react-redux";

function Portfolio() {
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const portfolio = user.portfolio;
  const [formState, setFormState] = useState({
    linkedin: "",
    github: "",
    website: "",
  });

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
    const newPortfolio = await addPortfolio({
      linkedin: formState.linkedin,
      github: formState.github,
      website: formState.website,
    });

    if (newPortfolio) {
      dispatch(updateUser(newPortfolio));
      setFormState({
        linkedin: "",
        github: "",
        website: "",
      });
    }
  };

  return (
    <div className="widget_container">
      <h2 className="font-bold text-lg">Portfolio</h2>
      <Button onClick={() => setOpenModal(true)}>+</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Portfolio</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label for="linkedin" class="block mb-2 text-sm">
                Linkedin
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={formState.linkedin}
                onChange={handleChange}
                placeholder="Linkedin"
              />
            </div>
            <div>
              <label for="github" class="block mb-2 text-sm">
                GitHub
              </label>
              <input
                type="text"
                id="github"
                name="github"
                value={formState.github}
                onChange={handleChange}
                placeholder="GitHub"
              />
            </div>
            <div>
              <label for="website" class="block mb-2 text-sm">
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formState.website}
                onChange={handleChange}
                placeholder="Website"
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
      {portfolio.length <= 0 ? (
        <p>Please update your project</p>
      ) : (
        <>
          {portfolio.map((item, index) => (
            <div key={index}>
              <h3>{item.linkedin}</h3>
              <h3>{item.github}</h3>
              <h3>{item.website}</h3>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
export default Portfolio;
