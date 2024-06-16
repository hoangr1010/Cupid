import React from "react";
import { IoMdMore } from "react-icons/io";

const OverviewView = ({ opening }) => {
  const company = opening.company;
  const totalAmount = opening.originalAmount;

  return (
    <div className="widget_container w-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{company}</h3>

        <IoMdMore className="text-grayLight" size={20} />
      </div>

      <p className="font-bold text-base">
        you opened {totalAmount} referral slots
      </p>
      <p className="text-xs text-grayLight">Open more slots to connect top candidates with your company!</p>
    </div>
  );
};

export default OverviewView;
