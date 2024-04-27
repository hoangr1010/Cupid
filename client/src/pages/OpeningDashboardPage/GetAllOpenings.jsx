import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeOpeningList } from "../../state";
import { getAllOpenings } from "../../api/opening";
import OpeningSlotCard from "./OpeningSlotCard";
import { toast } from "sonner";

const GetAllOpenings = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id) || null;
  const openingList = useSelector((state) => state.opening.list);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOpenings(userId);
        dispatch(changeOpeningList(response.data.data));
      } catch (err) {
        console.error(err);
        toast.error("There exists an error when retrieving opening slots");
      }
    };

    fetchData();
  }, [userId]);
  console.log(openingList);

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
      {openingList.map((opening, index) => (
        <li key={index} className="w-full">
          <OpeningSlotCard company={opening.company} status={opening.status} />
        </li>
      ))}
    </ul>
  );
};

export default GetAllOpenings;
