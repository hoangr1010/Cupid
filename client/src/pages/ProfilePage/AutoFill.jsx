import { React, useState, useRef, useCallback } from "react";
import { Button, Modal } from "flowbite-react";
import { autoFillResume, addAll } from "./../../api/user";
import { useSelector } from "react-redux";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import PortfolioForm from "./PortfolioForm";
import { useDispatch } from "react-redux";
import { updateUser } from "./../../state";

function AutoFill() {
  const user = useSelector((state) => state.auth.user);
  const resumeText = user.resume.text;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
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
    console.log(resumeJson);
    if (resumeJson.education) {
      const education = await preProcessField(resumeJson.education);
      setEducationData(education);
    }
    if (resumeJson.experience) {
      const experience = await preProcessField(resumeJson.experience);
      setExperienceData(experience);
    }
    if (resumeJson.project) {
      const project = await preProcessField(resumeJson.project);
      setProjectData(project);
    }
    if (resumeJson.portfolio) {
      const portfolio = await preProcessField(resumeJson.portfolio);
      setPortfolioData(portfolio);
    }
  };

  const handleSubmit = async () => {
    // Gather data from each form using refs or state
    const educationData = educationRef.current
      .map((ref) => ref?.getData())
      .filter((data) => data !== undefined);
    const experienceData = experienceRef.current
      .map((ref) => ref?.getData())
      .filter((data) => data !== undefined);
    const projectData = projectRef.current
      .map((ref) => ref?.getData())
      .filter((data) => data !== undefined);
    const portfolioData = portfolioRef.current
      .map((ref) => ref?.getData())
      .filter((data) => data !== undefined);

    if (!educationData || !experienceData || !projectData || !portfolioData) {
      throw new Error("All forms must be filled out.");
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
    }
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
      <Button
        onClick={async () => {
          setOpenModal(true);
          await autoFillForm();
        }}
      >
        Auto Fill Your Profile Page With AI
      </Button>
      <Modal size="4xl" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Auto Fill Your Profile Page With AI</Modal.Header>
        <Modal.Body>
          <h2 className="font-bold text-lg">Education</h2>
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
            <p>Loading...</p>
          )}
          <Button onClick={addEducation}>Add Education</Button>

          <h2 className="font-bold text-lg">Experience</h2>
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
            <p>Loading...</p>
          )}
          <Button onClick={addExperience}>Add Experience</Button>

          <h2 className="font-bold text-lg">Project</h2>
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
            <p>Loading...</p>
          )}
          <Button onClick={addProject}>Add Project</Button>

          <h2 className="font-bold text-lg">Portfolio</h2>
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
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="filled-btn"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </Button>
          <Button
            className="filled-btn"
            color="gray"
            onClick={() => {
              setOpenModal(false);
              handleCancel();
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AutoFill;
