import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDistinctCompanyList } from "../../state";
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

  const dispatch = useDispatch();

  useEffect(() => {
    const getDistinctCompany = async () => {
      const responseOpening = await getAllExistingOpenings();
      const responseRequest = await getAllExistingRequests();

      const companyList = responseRequest
        .concat(responseOpening)
        .map((item) => item.company);

      const distinctCompanyList = [...new Set(companyList)];

      dispatch(updateDistinctCompanyList(distinctCompanyList));
    };

    getDistinctCompany();
  });

  return (
    <main className="h-full gap-12 overflow-auto">
      <h1>Statistics</h1>

      <ul></ul>
    </main>
  );
};

export default StatisticsTable;
