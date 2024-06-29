import { React } from "react";
import { MdModeEditOutline } from "react-icons/md";

function ProjectCard({ project }) {
  const descriptionLines = project.description.split("\n");
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{project.name}</div>
        <div className="text-primaryDark hover:text-primary">
          <MdModeEditOutline />
        </div>
      </div>
      <div className="text-grayLight">
        {project.start_m} {project.start_y} -{" "}
        {project.current ? "Present" : `${project.end_m} ${project.end_y}`}
      </div>
      <ul className="list-disc pl-5">
        {descriptionLines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectCard;
