import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PercentageChart from "../../../components/PercentageChart";
import EvaluationText from "../../../components/EvaluationText";
import OpeningInfoModal from "../OpeningInfoModal";

const CandidateView = () => {
  const requestList = useSelector((state) => state.opening.requestList);

  const matchedStatusRequestList = requestList.filter(
    (request) => request.status === "matched",
  );

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-4xl font-bold font-darker">Opening Overview</h2>
        <p className="text-grayLight font-bold">
          There are currently {matchedStatusRequestList.length} candidate
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {matchedStatusRequestList.map((request) => (
          <div
            key={request._id}
            className="widget_container w-full flex flex-col gap-3"
          >
            <p className="font-bold text-primaryDark">
              {request.candidate_id.first_name} {request.candidate_id.last_name}
            </p>

            <section className="flex gap-6">
              <PercentageChart percentage={request.compatibility} />

              <div className="flex items-center relative grow">
                <EvaluationText percentage={request.compatibility} />
                <OpeningInfoModal
                  request={request}
                  Trigger={
                    <button className="absolute bottom-0 right-0 outline-btn btn-padding">
                      View Candidate
                    </button>
                  }
                />
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateView;
