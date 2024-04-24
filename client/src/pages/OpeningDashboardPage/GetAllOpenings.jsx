import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllOpenings } from "../../api/opening";
import OpeningSlotCard from "./OpeningSlotCard";
import { Toaster, toast } from "sonner";

const GetAllOpenings = () => {
  const userId = useSelector((state) => state.auth.user?._id) || null;
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOpenings(userId);
        setOpenings(response.data.data);
        toast.success("Successfully retrieved opening slots");
      } catch (err) {
        console.error(err);
        toast.error("There exists an error when retrieving opening slots");
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <ul>
        <div className="w-full grid grid-cols-2 gap-10">
          {openings.map((opening, index) => (
            <li key={index}>
              <OpeningSlotCard
                company={opening.company}
                status={opening.status}
              />
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default GetAllOpenings;
