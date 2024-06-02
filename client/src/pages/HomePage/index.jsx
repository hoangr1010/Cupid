import React from "react";
import StatisticsTable from "./StatisticsTable.jsx";

const HomePage = () => {
  return (
    <>
      <h1 className="text-5xl font-bold font-darker mb-8 text-primaryDark">
        Dashboard
      </h1>
      <StatisticsTable />
    </>
  );
};

export default HomePage;
