import { useSelector } from "react-redux";
import StatusBadge from "../../components/StatusBadge";
import OpeningInfoModal from "./OpeningInfoModal";
import { Table } from "flowbite-react";
const dayjs = require("dayjs");

const GetAllOpenings = ({ matchedRequestList }) => {
  const userId = useSelector((state) => state.auth.user?._id) || null;

  return (
    <div className="overflow-x-auto w-full">
      <h1 className="text-4xl font-bold font-darker mb-3">Opening Slots</h1>
      <p className="text-grayLight font-bold mb-2">Opening Slots: 2</p>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Company</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">More</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {matchedRequestList.map((request, index) => (
            <Table.Row key={index} className="bg-white">
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2 text-black">
                  <p
                    className="font-bold"
                  >
                    {request.candidate_id.first_name}{" "}
                    {request.candidate_id.last_name}
                  </p>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="w-fit">
                  <StatusBadge status={request.status} />
                </div>
              </Table.Cell>
              <Table.Cell>
                {dayjs(request.createdAt).format("DD MMM")}
              </Table.Cell>
              <Table.Cell>
                <OpeningInfoModal
                  openingId={request._id}
                  company={request.company}
                  status={request.status}
                  date={dayjs(request.createdAt).format("DD MMM YYYY")}
                  requestId={request._id || null}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default GetAllOpenings;
