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
