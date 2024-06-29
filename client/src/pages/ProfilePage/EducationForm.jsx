import {
  React,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { addEducation } from "./../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../state";

const EducationForm = forwardRef(({ educationData, onDelete }, ref) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    school: "",
    major: "",
    degree: "",
    gpa: 0,
    start: 0,
    end: 0,
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
    if (educationData) {
      setFormState(educationData);
    }
  }, [educationData]);

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
    }
  };

  useImperativeHandle(ref, () => ({
    getData: () => formState,
  }));

  return (
    <div className="widget_container">
      <form onSubmit={handleSubmit} class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="school" class="block mb-2 text-sm">
            School Name
          </label>
          <input
            type="text"
            id="school"
            name="school"
            value={formState.school}
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
            value={formState.major}
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
            name="degree"
            value={formState.degree}
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
            value={formState.gpa}
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
            value={formState.start_year}
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
            value={formState.end_year}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="End Year"
          />
        </div>
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </form>
    </div>
  );
});

export default EducationForm;
