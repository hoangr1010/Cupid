import { useState, useEffect } from "react";
import AddSlotButton from "./AddSlotButton";
import OpeningSlotCard from "./OpeningSlotCard";
// import axios from "axios";

const Function = () => {
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    const fetchOpenings = async (userId) => {
      try {
        const response = await fetch(`/opening/getAll/${userId}`);
        const data = await response.json();
        setOpenings(data);
      } catch (error) {
        console.error("Error fetching openings:", error);
      }
    };

    fetchOpenings("660ce122f99a93e263f053b4");
  }, []);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {/* {openingSlots} */}
      <AddSlotButton to="./create" />
      <ul>
        {openings.map((opening, index) => (
          <li key={index}>
            {opening.company} - {opening.role}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Function;

// test UI
// Test endpoint
// When hit to the page, all endpoints is loaded
