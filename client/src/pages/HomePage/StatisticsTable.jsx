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
    const getDistinctCompany = async () => {
      const responseOpening = await getAllExistingOpenings();
      const responseRequest = await getAllExistingRequests();

      const companyList = responseRequest
        .concat(responseOpening)
        .map((item) => item.company);

      const distinctCompanyList = [...new Set(companyList)];

      dispatch(updateDistinctCompanyList(distinctCompanyList));
    };

    const getCompanyStatistic = async () => {
      distinctCompanyList.forEach(async (company) => {
        dispatch(
          updateCompanyStatistic({
            company: company,
            data: {
              remainingRequests: (await getRemainingRequestsByCompany(company))
                .length,
              remainingOpenings: (await getRemainingOpeningsByCompany(company))
                .length,
            },
          }),
        );
      });
    };

    await getDistinctCompany();
    await getCompanyStatistic();
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
            {companyStatistic[company].remainingRequests} / Remaining Openings:{" "}
            {companyStatistic[company].remainingOpenings})
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StatisticsTable;
