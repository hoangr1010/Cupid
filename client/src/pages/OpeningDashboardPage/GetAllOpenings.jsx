import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllOpenings } from "../../api/opening";
import OpeningSlotCard from "./OpeningSlotCard";
import { toast } from "sonner";

const GetAllOpenings = () => {
  const userId = useSelector((state) => state.auth.user?._id) || null;
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOpenings(userId);
        setOpenings(response.data.data);
      } catch (err) {
        console.error(err);
        toast.error("There exists an error when retrieving opening slots");
      }
    };

    fetchData();
  }, [userId]);

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
      {openings.map((opening, index) => (
        <li key={index} className="w-full">
          <OpeningSlotCard company={opening.company} status={opening.status} />
        </li>
      ))}
    </ul>
  );
};

export default GetAllOpenings;