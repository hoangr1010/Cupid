import RequestCard from "./RequestCard";
import { getAllRequests } from "../../api/request";
import { useEffect, useState } from "react";
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

  const sortedRequestList = [...requestList].sort((a, b) => a.priority - b.priority);
  
  const [openCreate, setOpenCreate] = useState(false);

  function onCloseCreate() {
    setOpenCreate(false);
  }

  function onOpenCreate() {
    setOpenCreate(true);
  }

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

              <Table.Body className="divide-y">
                {sortedRequestList.map((request) => (
                  <Table.Row className="bg-white">
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
