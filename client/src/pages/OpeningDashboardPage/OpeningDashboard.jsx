import AddSlotButton from "./AddSlotButton";
import GetAllOpenings from "./GetAllOpenings";
import React from "react";

const OpeningDashboard = () => {
  return (
    <main className="flex-1 flex flex-col items-center gap-12 py-7 px-12 overflow-auto">
      <h1 className="text-3xl">Referral Openings</h1>

      <AddSlotButton />
      <GetAllOpenings />
    </main>
  );
};

export default OpeningDashboard;
