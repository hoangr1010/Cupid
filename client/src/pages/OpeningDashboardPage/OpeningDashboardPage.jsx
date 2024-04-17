import Sidebar from "../../components/Sidebar";
import Function from "./Function"
import React from "react";

const OpeningDashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-3xl">Referral Openings</h1>
        <Function />
      </main>
    </div>
  );
};

export default OpeningDashboardPage;
