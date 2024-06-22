import React from "react";
import { useSelector } from "react-redux";
import { IoMdMore } from "react-icons/io";
import StatusBadge from "../../../components/StatusBadge";
import CreateModal from "./CreateModal";

const OverviewView = () => {  
  const company = useSelector((state) => state.opening.company);
  const totalAmount = useSelector((state) => state.opening.originalAmount);
  const requestList = useSelector((state) => state.opening.requestList);

  const referredCount = requestList.filter(
    (request) => request.status === "referred",
  ).length;
  const approvedCount = requestList.filter(
    (request) => request.status === "approved",
  ).length;
  const matchedCount = requestList.filter(
    (request) => request.status === "matched",
  ).length;

  return (
    <div>
      <h2 className="text-4xl font-bold font-darker mb-8">Opening Overview</h2>

      <div className="widget_container w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{company}</h3>
          <button className="secondary-btn rounded-md font-bold">
            <IoMdMore size={20} />
          </button>
        </div>

        <p className="font-bold text-base">
          You opened {totalAmount} referral slots
        </p>
        <p className="text-xs text-grayLight">
          Open more slots to connect top candidates with your company!
        </p>

        <section className="flex flex-col gap-2 mt-4">
          <div className="flex items-center">
            <div className="flex border-r-2 border-grayLighter pr-2">
              <StatusBadge color="pink" text="Waiting for Referral" />
            </div>

            <p className="text-[20px] pl-2 font-bold">{approvedCount}</p>
          </div>

          <div className="flex items-center">
            <div className="flex border-r-2 border-grayLighter pr-2">
              <StatusBadge color="primary" text="Waiting for Acceptance" />
            </div>

            <p className="text-[20px] pl-2 font-bold">{matchedCount}</p>
          </div>

          <div className="flex items-center">
            <div className="flex border-r-2 border-grayLighter pr-2">
              <StatusBadge color="purple" text="Referred" />
            </div>

            <p className="text-[20px] pl-2 font-bold">{referredCount}</p>
          </div>
        </section>

        <section className="flex w-full justify-end">
          <CreateModal />
        </section>
      </div>
    </div>
  );
};

export default OverviewView;
