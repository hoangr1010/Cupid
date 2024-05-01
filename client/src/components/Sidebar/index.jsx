import { useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import BottomBar from "./BottomBar";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaHandHolding } from "react-icons/fa";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";

const Sidebar = () => {
  const location = useLocation();
  const iconSize = 23;
  const currPage = location.pathname;
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <ul
      className={
        isExpanded
          ? "h-screen flex flex-col bg-alt shadow-md w-56 min-w-fit"
          : "h-screen flex flex-col bg-alt shadow-md w-fit"
      }
    >
      <div className="flex-1 flex flex-col w-full">
        <p className="ps-5 p-2 font-righteous text-primary text-4xl">
          {isExpanded ? "Cupid" : "C"}
        </p>
        <SidebarItem
          path="/request"
          text="Referral Request"
          icon={<FaHandHolding size={iconSize} />}
          isCurrent={currPage === "/request"}
          isExpanded={isExpanded}
        />
        <SidebarItem
          path="/opening"
          text="Referral Opening"
          icon={<FaHandHoldingMedical size={iconSize} />}
          isCurrent={currPage === "/opening"}
          isExpanded={isExpanded}
        />
        <SidebarItem
          path="/profile"
          text="Profile"
          icon={<BsFillPersonFill size={iconSize} />}
          isCurrent={currPage === "/profile"}
          isExpanded={isExpanded}
        />
      </div>
      <div>
        <p className="flex justify-end">
          <button
            className="p-3 text-primary hover:text-primaryDark"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <AiOutlineDoubleLeft size={20} />
            ) : (
              <AiOutlineDoubleRight size={20} />
            )}
          </button>
        </p>
      </div>

      <div className="border-t border-gray-200"></div>
      <BottomBar isExpanded={isExpanded} />
    </ul>
  );
};

export default Sidebar;
