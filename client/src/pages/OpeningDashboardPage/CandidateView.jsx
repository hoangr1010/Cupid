import React, { useState, useEffect } from "react";
import PercentageChart from "./../../components/PercentageChart";
import EvaluationText from "../../components/EvaluationText";

const CandidateView = ({ opening }) => {
  const matchedStatusRequestList = opening.requestList.filter(
    (request) => request.status === "matched",
  );

  console.log(matchedStatusRequestList);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      {matchedStatusRequestList.map((request) => (
        <div
          key={request._id}
          className="widget_container w-full flex flex-col gap-3"
        >
          <h3 className="font-bold text-primaryDark">
            {request.candidate_id.first_name} {request.candidate_id.last_name}
          </h3>

          <section className="flex gap-6">
            <PercentageChart percentage={request.compatibility} />

            <div className="flex items-center relative grow">
              <EvaluationText percentage={request.compatibility} />
              <button className="absolute bottom-0 right-0 outline-btn btn-padding">
                View Candidate
              </button>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default CandidateView;
