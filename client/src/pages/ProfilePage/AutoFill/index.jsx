import { React, useState, useRef, useCallback } from "react";
import { Button, Modal } from "flowbite-react";
import { autoFillResume, addAll } from "../../../api/user";
import { useSelector } from "react-redux";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import PortfolioForm from "./PortfolioForm";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../state";
import { FaGraduationCap, FaTools } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import HorizontalDivider from "./../../../components/HorizontalDivider";
import { PiBagSimpleFill } from "react-icons/pi";
import { Spinner } from "flowbite-react";
import { toast } from "sonner";

const AutoFill = () => {
  const user = useSelector((state) => state.auth.user);
  const resumeText = user.resume.text;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [educationData, setEducationData] = useState([{}]);
  const [experienceData, setExperienceData] = useState([{}]);
  const [projectData, setProjectData] = useState([{}]);
  const [portfolioData, setPortfolioData] = useState([{}]);

  const educationRef = useRef([]);
  const experienceRef = useRef([]);
  const projectRef = useRef([]);
  const portfolioRef = useRef([]);

  const preProcessField = async (field) => {
    if (!Array.isArray(field)) {
      return [field];
    } else {
      return field;
    }
  };
  const autoFillForm = async () => {
    const resumeJson = await autoFillResume(resumeText);
    if (!resumeJson) {
      toast.error("Failed to parse resume. Try again!");
      return;
    }

    if (resumeJson && resumeJson.education) {
      const education = await preProcessField(resumeJson.education);
      setEducationData(education);
    }
    if (resumeJson && resumeJson.experience) {
      const experience = await preProcessField(resumeJson.experience);
      setExperienceData(experience);
    }
    if (resumeJson && resumeJson.project) {
      const project = await preProcessField(resumeJson.project);
      setProjectData(project);
    }
    if (resumeJson && resumeJson.portfolio) {
      const portfolio = await preProcessField(resumeJson.portfolio);
      setPortfolioData(portfolio);
    }
  };

  const handleSubmit = async () => {
    // Gather data from each form using refs or state
    setIsSubmitLoading(true);

    const educationData = getDataOrReturnNull(educationRef);
    const experienceData = getDataOrReturnNull(experienceRef);
    const projectData = getDataOrReturnNull(projectRef);
    const portfolioData = getDataOrReturnNull(portfolioRef);
    console.log(educationData, experienceData, projectData, portfolioData);

    // if anyForm return null - means form validation fail
    if (
      educationData === null ||
      experienceData === null ||
      projectData === null ||
      portfolioData === null
    ) {
      setIsSubmitLoading(false);
      return;
    }

    const newData = await addAll(
      educationData,
      experienceData,
      projectData,
      portfolioData,
    );

    if (newData) {
      dispatch(updateUser(newData));
      setEducationData([]);
      setExperienceData([]);
      setPortfolioData([]);
      setProjectData([]);

      setOpenModal(false);
      toast.success("Profile updated successfully");
    }

    setIsSubmitLoading(false);
  };

  const handleCancel = () => {
    setEducationData([]);
    setExperienceData([]);
    setPortfolioData([]);
    setProjectData([]);
  };

  const deleteEducation = useCallback((index) => {
    setEducationData((forms) => forms.filter((_, i) => i !== index));
    educationRef.current = educationRef.current.filter((_, i) => i !== index);
  }, []);
  const deleteExperience = useCallback((index) => {
    setExperienceData((forms) => forms.filter((_, i) => i !== index));
    experienceRef.current = experienceRef.current.filter((_, i) => i !== index);
  }, []);
  const deleteProject = useCallback((index) => {
    setProjectData((forms) => forms.filter((_, i) => i !== index));
    projectRef.current = projectRef.current.filter((_, i) => i !== index);
  }, []);
  const deletePortfolio = useCallback((index) => {
    setPortfolioData((forms) => forms.filter((_, i) => i !== index));
    portfolioRef.current = portfolioRef.current.filter((_, i) => i !== index);
  }, []);

  const addEducation = () => setEducationData([...educationData, {}]);
  const addExperience = () => setExperienceData([...experienceData, {}]);
  const addProject = () => setProjectData([...projectData, {}]);

  return (
    <div>
      <button
        className="filled-btn w-full py-2"
        onClick={async () => {
          setOpenModal(true);
          setIsLoading(true);
          await autoFillForm();
          setIsLoading(false);
        }}
      >
        Auto Fill Your Profile
      </button>
      <Modal size="4xl" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <div className="flex items-center">
            <p className="font-bold text-primaryDark text-2xl">
              Auto Fill Your Profile
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="flex flex-col gap-3 items-center justify-center">
              <Spinner
                className="fill-primary w-10 h-10"
                aria-label="Loading"
              />
              <p className="font-semibold">
                Give us a moment for parsing your resume
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* EDUCATION FORM */}
              <section className="flex flex-col gap-3">
                <div className="flex gap-2 items-center text-primaryDark">
                  <FaGraduationCap size={20} />
                  <h2 className="font-bold text-xl">Education</h2>
                </div>
                <HorizontalDivider className="pb-2" type="primary" />
                {educationData.length > 0 ? (
                  educationData.map((edu, index) => (
                    <EducationForm
                      ref={(el) => (educationRef.current[index] = el)}
                      key={index}
                      educationData={edu}
                      onDelete={() => deleteEducation(index)}
                    />
                  ))
                ) : (
                  <p className="font-bold text-center text-2xl text-primaryDark">
                    Empty
                  </p>
                )}
                <button
                  className="filled-btn btn-padding"
                  onClick={addEducation}
                >
                  + Education
                </button>
              </section>

              {/* EXPERIENCE FORM */}
              <section className="flex flex-col gap-3">
                <div className="flex gap-2 items-center text-primaryDark">
                  <PiBagSimpleFill size={20} />
                  <h2 className="font-bold text-xl">Experience</h2>
                </div>
                <HorizontalDivider className="pb-2" type="primary" />

                {experienceData.length > 0 ? (
                  experienceData.map((exp, index) => (
                    <ExperienceForm
                      ref={(el) => (experienceRef.current[index] = el)}
                      key={index}
                      experienceData={exp}
                      onDelete={() => deleteExperience(index)}
                    />
                  ))
                ) : (
                  <p className="font-bold text-center text-2xl text-primaryDark">
                    Empty
                  </p>
                )}
                <button
                  className="filled-btn btn-padding"
                  onClick={addExperience}
                >
                  + Experience
                </button>
              </section>

              <section className="flex flex-col gap-3">
                <div className="flex gap-2 items-center text-primaryDark">
                  <FaTools size={20} />
                  <h2 className="font-bold text-xl">Project</h2>
                </div>
                <HorizontalDivider className="pb-2" type="primary" />

                {projectData.length > 0 ? (
                  projectData.map((prj, index) => (
                    <ProjectForm
                      ref={(el) => (projectRef.current[index] = el)}
                      key={index}
                      projectData={prj}
                      onDelete={() => deleteProject(index)}
                    />
                  ))
                ) : (
                  <p className="font-bold text-center text-2xl text-primaryDark">
                    Empty
                  </p>
                )}
                <button className="filled-btn btn-padding" onClick={addProject}>
                  + Project
                </button>
              </section>

              <section className="flex flex-col gap-3">
                <div className="flex gap-2 items-center text-primaryDark">
                  <CiBoxList size={20} />
                  <h2 className="font-bold text-xl">Portfolio</h2>
                </div>
                <HorizontalDivider className="pb-2" type="primary" />

                {portfolioData.length > 0 ? (
                  portfolioData.map((port, index) => (
                    <PortfolioForm
                      ref={(el) => (portfolioRef.current[index] = el)}
                      key={index}
                      portfolioData={port}
                      onDelete={() => deletePortfolio(index)}
                    />
                  ))
                ) : (
                  <p className="font-bold text-center text-2xl text-primaryDark">
                    Empty
                  </p>
                )}
              </section>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full gap-3">
            <button
              className="outline-btn btn-padding"
              color="gray"
              onClick={() => {
                setOpenModal(false);
                handleCancel();
              }}
            >
              Cancel
            </button>
            <button
              className="filled-btn btn-padding"
              disabled={isSubmitLoading}
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// return null -> form error(includes null), [] -> empty form (includes undefined), [...] -> success form
const getDataOrReturnNull = (ref) => {
  const mappedData = ref.current.map((ref) => ref?.getData());

  if (mappedData.includes(null)) {
    return null; // form error
  } else if (mappedData.includes(undefined)) {
    return mappedData.filter((item) => item !== undefined); // empty form
  } else {
    return mappedData; // success form
  }
};

export default AutoFill;
