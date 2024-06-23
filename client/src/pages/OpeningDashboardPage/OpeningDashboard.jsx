import TableView from "./TableView";
import CreateOpeningModal from "./StartingView/CreateOpeningModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOpening, resetOpening } from "../../state";
import { getAllOpenings } from "../../api/opening";
import { toast } from "sonner";
import OverviewView from "./OverviewView";
import CandidateView from "./CandidateView";

const OpeningDashboard = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const openingOriginalAmount = useSelector((state) => state.opening.originalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOpenings();
        if (response) {
          dispatch(loadOpening(response));
        } else {
          dispatch(resetOpening());
        }
      } catch (err) {
        toast.error("There exists an error when retrieving opening slots");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="w-full h-full gap-4 overflow-auto flex flex-col">
        <h1 className="text-5xl font-bold font-darker text-primaryDark">
          Referral Openings
        </h1>
        {openingOriginalAmount === null ? (
          <div className="flex flex-col justify-center items-center h-full gap-8">
            <img
              className="w-1/3"
              src="/openingEmpty.png"
              alt="openingEmptyPage"
            />

            <section className="text-center">
              <p className="font-bold">
                You currently don’t have any referral openings
              </p>
              <p className="text-grayLight">
                Get started now and connect top candidates with your company!
              </p>
            </section>

            <CreateOpeningModal />
          </div>
        ) : (
          <>
            <div className="flex gap-10 lg:flex-row-reverse flex-col justify-end">
              <OverviewView />
              <TableView />
            </div>
            <CandidateView />
          </>
        )}
      </main>
    </>
  );
};

export default OpeningDashboard;
