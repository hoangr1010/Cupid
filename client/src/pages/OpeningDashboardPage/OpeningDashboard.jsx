import { useState } from "react";
import GetAllOpenings from "./OpeningView";
import CreateOpeningModal from "./CreateOpeningModal";
import React from "react";

const OpeningDashboard = () => {
  const [openCreate, setOpenCreate] = useState(false);

  function onCloseCreate() {
    setOpenCreate(false);
  }

  function onOpenCreate() {
    setOpenCreate(true);
  }

  return (
    <>
      <CreateOpeningModal openCreate={openCreate} onClose={onCloseCreate} />
      <main className="w-full h-full gap-12 overflow-auto">
        <h1 className="text-3xl font-bold mb-8">Referral Openings</h1>

        <div className="flex-1 flex flex-col items-center gap-12 w-full">
          {/* Create Opening button */}
          <button
            onClick={onOpenCreate}
            type="button"
            className="filled-btn p-2"
          >
            Create Opening Slots
          </button>

          <GetAllOpenings />
        </div>
      </main>
    </>
  );
};

export default OpeningDashboard;
