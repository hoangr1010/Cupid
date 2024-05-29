import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDistinctCompanyList, updateCompanyStatistic } from "../../state";
import { getRemainingRequestsByCompany } from "../../api/request";
import {
  getAllExistingOpenings,
  getRemainingOpeningsByCompany,
} from "../../api/opening";
import { getAllExistingRequests } from "../../api/request";

const StatisticsTable = () => {
  const distinctCompanyList = useSelector(
    (state) => state.distinctCompanyList.list,
  );
  const companyStatistic = useSelector((state) => state.companyStatistic.map);

  const dispatch = useDispatch();

  const getData = async () => {
    const responseOpening = await getAllExistingOpenings();
    const responseRequest = await getAllExistingRequests();

    const companyList = responseRequest
      .concat(responseOpening)
      .map((item) => item.company);

    const distinctCompanyList = [...new Set(companyList)];

    dispatch(updateDistinctCompanyList(distinctCompanyList));

    for (const company of distinctCompanyList) {
      const remainingRequestsLength = (
        await getRemainingRequestsByCompany(company)
      ).length;
      const remainingOpeningsLength = (
        await getRemainingOpeningsByCompany(company)
      ).length;

      console.log(company);

      dispatch(
        updateCompanyStatistic({
          company: company,
          data: {
            remainingRequests: remainingRequestsLength,
            remainingOpenings: remainingOpeningsLength,
          },
        }),
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="h-full gap-12 overflow-auto">
      <h1 className="text-3xl mb-5">Statistics</h1>

      <ul>
        {distinctCompanyList.map((company) => (
          <li key={company}>
            {" "}
            {company} (Remaining Requests:{" "}
            {companyStatistic.hasOwnProperty(company)
              ? companyStatistic[company].remainingRequests
              : "Loading"}{" "}
            / Remaining Openings:{" "}
            {companyStatistic.hasOwnProperty(company)
              ? companyStatistic[company].remainingOpenings
              : "Loading"}
            )
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StatisticsTable;
