import React from "react";

const EvaluationText = ({ percentage }) => {
  let textEvaluation;
  let color;

  if (percentage >= 0 && percentage < 30) {
    textEvaluation = "Low";
    color = "pink";
  } else if (percentage >= 30 && percentage < 70) {
    textEvaluation = "Medium";
    color = "yellowDark";
  } else {
    textEvaluation = "High";
    color = "primary";
  }

  return (
    <p className="font-bold">
      <span className={`text-${color}`}>{textEvaluation}</span> Compatibility
    </p>
  );
};

export default EvaluationText;
