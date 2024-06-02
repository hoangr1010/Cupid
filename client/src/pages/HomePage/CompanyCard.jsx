import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";

const CompanyCard = ({ company, companyStatistic }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [requestAmount, setRequestAmount] = useState(0);
  const [openingAmount, setOpeningAmount] = useState(0);

  let percentage;
  let indicatorColor;
  if (requestAmount <= openingAmount) {
    percentage = Math.floor((requestAmount / openingAmount) * 100);
    indicatorColor = "primaryDark";

    if (requestAmount == 0) {
      percentage = 0;
    }
  } else {
    percentage = Math.floor((requestAmount / openingAmount) * 100);
    indicatorColor = "pinkDark";

    if (openingAmount == 0) {
      percentage = 100;
    }
  }

  useEffect(() => {
    if (companyStatistic.hasOwnProperty(company)) {
      setIsLoading(false);
      setRequestAmount(companyStatistic[company].remainingRequests);
      setOpeningAmount(companyStatistic[company].remainingOpenings);
    }
  }, [companyStatistic]);

  return (
    <li key={company} className="widget_container">
      <h3 className="font-bold pb-2">{company}</h3>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner className="fill-primary w-10 h-10" aria-label="Loading" />
        </div>
      ) : (
        <>
          <span className={`text-4xl font-bold text-${indicatorColor}`}>
            {requestAmount}
          </span>
          <span className="font-bold">/{openingAmount}</span>
          <p className="font-bold text-[10px] mb-2">opening filled</p>

          <div class="w-full bg-primaryLight rounded-full h-2.5">
            {requestAmount > openingAmount ? (
              <div
                className="bg-gradient-to-r from-primary to-pinkDark h-2.5 rounded-full transition-all"
                style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
              ></div>
            ) : (
              <div
                className="bg-primaryDark h-2.5 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              ></div>
            )}
          </div>

          <p className={`text-[10px] font-bold pl-2 text-primaryDark`}>
            {openingAmount == 0 ? ">100%" : `${percentage}%`}
          </p>
        </>
      )}
    </li>
  );
};

export default CompanyCard;
