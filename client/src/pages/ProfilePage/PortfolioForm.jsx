import {
  React,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { addPortfolio } from "./../../api/user";
import { useDispatch } from "react-redux";
import { updateUser } from "./../../state";

const PortfolioForm = forwardRef(({ portfolioData, onDelete }, ref) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (portfolioData) {
      setFormState(portfolioData);
    }
  }, [portfolioData]);

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

  useImperativeHandle(ref, () => ({
    getData: () => formState,
  }));

  return (
    <div className="widget_container">
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
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </form>
    </div>
  );
});

export default PortfolioForm;
