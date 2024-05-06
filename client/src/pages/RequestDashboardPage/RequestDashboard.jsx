import RequestCard from "./RequestCard";
import { getAllRequests } from "../../api/request";
import { useEffect } from "react";
import { changeRequestList } from "../../state";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import { Table } from "flowbite-react";
const dayjs = require("dayjs");

const RequestDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const requestList = useSelector((state) => state.request.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <main className="flex-1 flex flex-col gap-12 py-7 px-12 overflow-auto">
      <h1 className="text-3xl font-bold">Referral Request</h1>

      <button
        type="button"
        onClick={() => navigate("/request/create")}
        className="filled-btn p-2 self-center"
      >
        Create Referral Request
      </button>

      {requestList.length > 0 ? (
        <div className="overflow-x-auto">
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
              {requestList.map((request) => (
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
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      More
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div>You currently have 0 referral request</div>
      )}
    </main>
  );
};
export default RequestDashboard;
