import RequestCard from "./RequestCard";
import { getAllRequests, changeRequestPriority } from "../../api/request";
import { useEffect, useRef, useState } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { Table } from "flowbite-react";
import CreateRequest from "./CreateRequest";
import { reorderRequests } from "./../../utils/request";
import { FaExternalLinkAlt } from "react-icons/fa";
import dayjs from "dayjs";
import { Spinner } from "flowbite-react";
import StatusBadge from "../../components/StatusBadge";

const RequestDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const requestList = useSelector((state) => state.request.list);
  const dispatch = useDispatch();

  // save drag and draggedOver priority
  const dragPriority = useRef(0);
  const draggedOverPriority = useRef(0);
  const [isLoadingDrag, setIsLoadingDrag] = useState(false);

  // Sort requests by priority
  const sortedRequestList = [...requestList].sort(
    (a, b) => a.priority - b.priority,
  );

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

  const handleDragEnd = async () => {
    setIsLoadingDrag(true);
    const newRequests = reorderRequests(
      [...(sortedRequestList || [])],
      dragPriority,
      draggedOverPriority,
    );

    if (newRequests) {
      try {
        const newRequestList = await changeRequestPriority(newRequests);

        if (newRequestList) {
          dispatch(changeRequestList(newRequestList));
        } else {
          throw new Error("Error changing priority");
        }
      } catch (err) {
        toast.error(err);
      }
    }
    setIsLoadingDrag(false);
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-12 overflow-auto h-full">
        <h1 className="text-5xl font-bold font-darker text-primaryDark">
          Referral Requests
        </h1>{" "}
        {sortedRequestList.length > 0 ? (
          <>
            <div className="overflow-x-auto h-full">
              <div>
                {isLoadingDrag && (
                  <Spinner
                    className="fill-primary w-16 h-16 absolute left-1/2 top-1/4 z-10"
                    aria-label="Loading"
                  />
                )}
                <Table
                  hoverable
                  className={
                    isLoadingDrag ? "opacity-50 pointer-events-none" : ""
                  }
                >
                  <Table.Head>
                    <Table.HeadCell>Priority</Table.HeadCell>
                    <Table.HeadCell>Company</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">More</span>
                    </Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y transition-all">
                    {sortedRequestList.map((request) => (
                      <Table.Row
                        key={request._id}
                        draggable
                        onDragStart={() => {
                          dragPriority.current = request.priority;
                        }}
                        onDragEnter={() => {
                          draggedOverPriority.current = request.priority;
                        }}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => {
                          e.preventDefault();
                        }}
                        className="bg-white cursor-grab"
                      >
                        <Table.Cell>{request.priority}</Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-3">
                            {request.company}
                            <a
                              href={request.job_posting_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaExternalLinkAlt />
                            </a>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="w-fit">
                            <StatusBadge status={request.status} />
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          {dayjs(request.createdAt).format("DD-MM-YYYY")}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <CreateRequest />
            </div>
          </>
        ) : (
          <CreateRequest />
        )}
      </main>
    </>
  );
};
export default RequestDashboard;
