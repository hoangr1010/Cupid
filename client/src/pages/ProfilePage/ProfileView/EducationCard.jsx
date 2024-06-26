import { React } from "react";
import { MdModeEditOutline } from "react-icons/md";

function EducationCard({ education }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{education.school}</div>
        <div className="text-primaryDark hover:text-primary">
          <MdModeEditOutline />
        </div>
      </div>
      {education.start_year && education.end_year && (
        <div className="text-grayLight">
          {education.start_year} - {education.end_year}
        </div>
      )}
      <div className="font-bold">
        {education.degree} in {education.major}
      </div>
      {education.gpa && (
        <ul className="list-disc pl-5">
          <li>{`GPA: ${education.gpa}`}</li>
        </ul>
      )}
    </div>
  );
}

export default EducationCard;
