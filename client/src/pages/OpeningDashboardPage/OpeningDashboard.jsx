import TableView from "./TableView";
import CreateOpeningModal from "./CreateOpeningModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOpening } from "../../state";
import { getAllOpenings } from "../../api/opening";
import { toast } from "sonner";
import OverviewView from "./OverviewView";

const OpeningDashboard = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const opening = useSelector((state) => state.opening);
  const matchedRequestList = opening.requestList;
  const dispatch = useDispatch();

  console.log(opening);

  function onCloseCreate() {
    setOpenCreate(false);
  }

  function onOpenCreate() {
    setOpenCreate(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOpenings();
        dispatch(loadOpening(response));
      } catch (err) {
        console.error(err);
        toast.error("There exists an error when retrieving opening slots");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <CreateOpeningModal openCreate={openCreate} onClose={onCloseCreate} /> */}
      <main className="w-full h-full gap-4 overflow-auto flex flex-col">
        <h1 className="text-5xl font-bold font-darker text-primaryDark">
          Referral Openings
        </h1>

        <OverviewView opening={opening} />
        <TableView matchedRequestList={matchedRequestList} opening={opening} />
      </main>
    </>
  );
};

export default OpeningDashboard;
