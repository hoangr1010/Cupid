const RequestProgressBar = ({ totalSteps = 4, activeSteps = 1 }) => {
  const progressSteps = ["Requested", "Matched", "Accepted", "Deffered"];
  return (
    <div className="flex-1 flex items-center">
      {[...Array(totalSteps)].map((_, index) => (
        <div className="w-full flex flex-col items-center" key={index}>
          <div className={`${index >= activeSteps ? "opacity-25" : ""}`}>
            {progressSteps[index]}
          </div>
          <div className="flex items-center w-full">
            <div
              className={`flex-1 h-0.5 ${index < activeSteps ? "bg-primaryDark" : "bg-primaryLight"} ${index == 0 ? "invisible" : ""}`}
            />
            <div
              className={`w-3 h-3 grow-0 shrink-0 ${index < activeSteps ? "bg-primaryDark" : "bg-primaryLight"} rounded-full`}
            ></div>
            <div
              className={`flex-1 h-0.5 ${index < activeSteps - 1 ? "bg-primaryDark" : "bg-primaryLight"} ${index + 1 == totalSteps ? "invisible" : ""}`}
            />
          </div>
          <div className={`${index >= activeSteps ? "invisible" : ""}`}>
            Date
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestProgressBar;
