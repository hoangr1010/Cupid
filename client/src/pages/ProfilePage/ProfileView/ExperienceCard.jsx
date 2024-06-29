import { React } from "react";
import { MdModeEditOutline } from "react-icons/md";

function ExperienceCard({ experience }) {
  const descriptionLines = experience.description.split("\n");
  const currentCard = () => {
    return (
      <button className="filled-btn btn-padding text-xs">
        Current Company
      </button>
    );
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="text-lg font-bold">{experience.company}</div>
          {experience.current && currentCard()}
        </div>
        <div className="text-primaryDark hover:text-primary">
          <MdModeEditOutline />
        </div>
      </div>
      <div className="flex justify-between text-grayLight">
        <div>
          {experience.start_m} {experience.start_y} -{" "}
          {experience.current
            ? "Present"
            : `${experience.end_m} ${experience.end_y}`}
        </div>
        <div>{experience.location}</div>
      </div>
      <div className="font-bold">{experience.position}</div>
      <ul className="list-disc pl-5">
        {descriptionLines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;
