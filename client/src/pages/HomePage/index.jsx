import React from "react";
import StatisticsTable from "./StatisticsTable.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const HomePage = () => {
  const navigate = useNavigate();
  const numRequest = useSelector((state) => state.request.list.length);
  const numOpening = useSelector((state) => state.opening.originalAmount);
  const userName = useSelector((state) => state.auth.user.first_name);

  return (
    <div className="max-h-screen overflow-auto">
      {/* <h1 className="text-5xl font-bold font-darker mb-8 text-primaryDark">
        Dashboard
      </h1> */}
      <div className="text-2xl font-semibold text-primaryDark">
        Hi {userName}!
      </div>

      <div className="my-6">
        <div className="font-bold text-lg mb-2">Referral Summary</div>
        {/* <div>description</div> */}

        <div className="flex">
          <div className="border h-44 w-72 py-4 px-5 flex flex-col justify-between rounded-lg">
            <div className="text-sm font-semibold">You made</div>
            <div className="flex">
              <div className="font-bold text-5xl text-primaryDark">
                {numRequest}
              </div>
              <div className="font-semibold flex flex-col justify-end">
                <div>/10</div>
              </div>
            </div>
            <div className="text-primaryDark font-semibold text-sm">
              Referral Requests
            </div>
            <button
              onClick={() => navigate(`/request`)}
              className="filled-btn py-0.5 text-sm"
            >
              My Request
            </button>
          </div>

          <div className="border h-44 w-72 py-4 px-5 flex flex-col justify-between rounded-lg mx-4">
            <div className="text-sm font-semibold">You opened</div>

            <div className="font-bold text-5xl text-primaryDark">
              {numOpening ? numOpening : 0}
            </div>

            <div className="text-primaryDark font-semibold text-sm">
              Referral Slots
            </div>
            <button
              onClick={() => navigate(`/opening`)}
              className="filled-btn py-0.5 text-sm"
            >
              My Openings
            </button>
          </div>
        </div>
      </div>

      <div className="font-bold text-lg mb-2">Companies with Openings</div>
      <div className="w-full h-8 border flex mb-4 rounded-lg">
        <div className="w-8 flex justify-center justify-items-center items-center">
          <IoSearch style={{ color: "grey" }} size={20} />
        </div>

        <input
          className="h-full w-full border-hidden text-sm rounded-lg"
          type="text"
          placeholder="Search for companies"
        />
      </div>

      <StatisticsTable />
    </div>
  );
};

export default HomePage;
