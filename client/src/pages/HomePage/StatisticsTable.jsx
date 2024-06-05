import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDistinctCompanyList, updateCompanyStatistic } from "../../state";
import { getAllExistingOpenings } from "../../api/opening";
import { getAllExistingRequests } from "../../api/request";
import CompanyCard from "./CompanyCard";

const StatisticsTable = () => {
  const distinctCompanyList = useSelector(
    (state) => state.distinctCompanyList.list,
  );
  const companyStatistic = useSelector((state) => state.companyStatistic.map);

  const dispatch = useDispatch();

  const getData = async () => {
    const responseOpening = await getAllExistingOpenings();
    const responseRequest = await getAllExistingRequests();

    let distinctCompanyList = [];

    let companyCount = {};

    responseOpening.forEach((opening) => {
      distinctCompanyList.push(opening.company);

      if (!companyCount[opening.company]) {
        companyCount[opening.company] = {
          remainingRequests: 0,
          remainingOpenings: 0,
        };
      }

      companyCount[opening.company].remainingOpenings += 1;
    });

    responseRequest.forEach((request) => {
      distinctCompanyList.push(request.company);
      if (!companyCount[request.company]) {
        companyCount[request.company] = {
          remainingRequests: 0,
          remainingOpenings: 0,
        };
      }

      companyCount[request.company].remainingRequests += 1;
    });

    distinctCompanyList = [...new Set(distinctCompanyList)]; // Remove duplicates

    dispatch(updateDistinctCompanyList(distinctCompanyList));

    distinctCompanyList.forEach((company) => {
      dispatch(
        updateCompanyStatistic({
          company: company,
          data: companyCount[company],
        }),
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(distinctCompanyList, companyStatistic);

  return (
    <main className="h-full gap-12 overflow-auto">
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {distinctCompanyList.map((company) => (
          <CompanyCard company={company} companyStatistic={companyStatistic} />
        ))}
      </ul>
    </main>
  );
};

export default StatisticsTable;
