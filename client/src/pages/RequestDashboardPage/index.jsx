import { getAllRequests, changeRequestPriority } from "../../api/request";
import { useEffect, useRef, useState } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import RequestDashboard from "./RequestDashboard.jsx";
import CreateRequest from "./CreateRequest";

const RequestDashboardPage = () => {
  const user = useSelector((state) => state.auth.user);
  const requestList = useSelector((state) => state.request.list);
  const dispatch = useDispatch();

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    try {
      const response = await getAllRequests(user._id);
      dispatch(changeRequestList(response.data.data));
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 overflow-auto h-full">
        <h1 className="text-5xl font-bold font-darker text-primaryDark">
          Referral Requests
        </h1>{" "}
        {requestList.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full gap-8">
            <img
              className="w-1/3"
              src="/requestEmpty.png"
              alt="Reqest Empty Page"
            />

            <section className="text-center">
              <p className="font-bold">
                You currently don’t have any referral openings
              </p>
              <p className="text-grayLight">
                Get started now and connect top candidates with your company!
              </p>
            </section>

            <CreateRequest />
          </div>
        ) : (
          <>
            <div className="text-grayLight">
              You have made {requestList.length}/10 requests. Upgrade for
              unlimited requests.
            </div>
            <RequestDashboard requestList={requestList} />
          </>
        )}
      </main>
    </>
  );
};

export default RequestDashboardPage;
