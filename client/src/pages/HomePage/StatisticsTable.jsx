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

    Object.keys(responseOpening).forEach((company) => {
      distinctCompanyList.push(company);

      if (!companyCount[company]) {
        companyCount[company] = {
          remainingRequests: 0,
          remainingOpenings: 0,
        };
      }

      companyCount[company].remainingOpenings += responseOpening[company];
    });

    Object.keys(responseRequest).forEach((company) => {
      distinctCompanyList.push(company);
      if (!companyCount[company]) {
        companyCount[company] = {
          remainingRequests: 0,
          remainingOpenings: 0,
        };
      }

      companyCount[company].remainingRequests += responseRequest[company];
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
