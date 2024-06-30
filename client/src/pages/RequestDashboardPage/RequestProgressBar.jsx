const RequestProgressBar = ({
  totalSteps = 4,
  activeSteps = 1,
  requestedDate,
}) => {
  const progressSteps = ["Requested", "Matched", "Accepted", "Reffered"];
  return (
    <div className="flex-1 flex items-center">
      {[...Array(totalSteps)].map((_, index) => (
        <div className="w-full flex flex-col items-center gap-1" key={index}>
          <div
            className={`${index >= activeSteps ? "text-grayLight" : "text-primaryDark"} font-medium`}
          >
            {progressSteps[index]}
          </div>
          <div className="flex items-center w-full">
            <div
              className={`flex-1 h-0.5 ${index < activeSteps ? "bg-primaryDark" : "bg-primary"} ${index == 0 ? "invisible" : ""}`}
            />
            <div
              className={`w-3 h-3 grow-0 shrink-0 ${index < activeSteps ? "bg-primaryDark" : "bg-primary"} rounded-full`}
            ></div>
            <div
              className={`flex-1 h-0.5 ${index < activeSteps - 1 ? "bg-primaryDark" : "bg-primary"} ${index + 1 == totalSteps ? "invisible" : ""}`}
            />
          </div>
          <div
            className={`text-xs ${index >= 1 ? "invisible" : ""} font-medium text-grayLight`}
          >
            {index == 0 ? requestedDate : "|"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestProgressBar;
