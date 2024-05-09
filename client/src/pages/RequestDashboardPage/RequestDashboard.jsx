import RequestCard from "./RequestCard";
import { getAllRequests } from "../../api/request";
import { useEffect, useRef } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { Table } from "flowbite-react";
import CreateRequest from "./CreateRequest";
const dayjs = require("dayjs");

const RequestDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const requestList = useSelector((state) => state.request.list);
  const dispatch = useDispatch();

  const sortedRequestList = [...requestList].sort(
    (a, b) => a.priority - b.priority,
  );

  const getRequests = async () => {
    try {
      const response = await getAllRequests(user._id);
      dispatch(changeRequestList(response.data.data));
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const dragRow = useRef(0);
  const draggedOverRow = useRef(0);

  const handleDragEnd = () => {
    let updatedRequestList = [...sortedRequestList];
    const dragRowObj = updatedRequestList.find((request) => request.priority === dragRow.current);
    
    // remove dragRow from updatedRequestList
    updatedRequestList.splice(dragRow.current - 1, 1);
    const draggedOverRowIndex = updatedRequestList.findIndex((request) => request.priority === draggedOverRow.current);

    // get the left and right side of the draggedOverRow
    const left = updatedRequestList.slice(0, draggedOverRowIndex);
    const right = updatedRequestList.slice(draggedOverRowIndex);

    // insert dragRow in between the left and right side of the draggedOverRow
    updatedRequestList = [...left, dragRowObj, ...right];

    // change priority inorder of the list
    updatedRequestList = updatedRequestList.map((request, index) => {
      return {...request, priority: index + 1};
    });

    dispatch(changeRequestList(updatedRequestList));
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-12 overflow-auto h-full">
        <h1 className="text-3xl font-bold">Referral Request</h1>
        {sortedRequestList.length > 0 ? (
          <div className="overflow-x-auto h-full">
            <Table hoverable>
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
                      dragRow.current = request.priority;
                    }}
                    onDragEnter={() => {
                      draggedOverRow.current = request.priority;
                    }}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => {e.preventDefault()}}
                    className="bg-white cursor-grab"
                  >
                    <Table.Cell>{request.priority}</Table.Cell>
                    <Table.Cell>{request.company}</Table.Cell>
                    <Table.Cell>
                      <div className="w-fit">
                        <RequestCard status={request.status} />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {dayjs(request.createdAt).format("DD-MM-YYYY")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <CreateRequest />
          </div>
        ) : (
          <CreateRequest />
        )}
      </main>
    </>
  );
};
export default RequestDashboard;
