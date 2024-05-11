import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeOpeningList } from "../../state";
import { getAllOpenings } from "../../api/opening";
import StatusBadge from "../../components/StatusBadge";
import OpeningInfoModal from "./OpeningInfoModal";
import { toast } from "sonner";
import { Table, Badge } from "flowbite-react";
const dayjs = require("dayjs");

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

  return (
    <div className="overflow-x-auto w-full">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Index</Table.HeadCell>
          <Table.HeadCell>Company</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {openingList.map((opening, index) => (
            <Table.Row key={opening._id} className="bg-white">
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{opening.company}</Table.Cell>
              <Table.Cell>
                <div className="w-fit">
                  <StatusBadge status={opening.status} />
                </div>
              </Table.Cell>
              <Table.Cell>
                {dayjs(opening.createdAt).format("DD-MM-YYYY")}
              </Table.Cell>
              <Table.Cell>
                {(opening.status === "matched" ||
                  opening.status === "approved") && (
                  <Badge color="pink" size="sm" className="w-fit">
                    required
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell>
                <OpeningInfoModal
                  openingId={opening._id}
                  company={opening.company}
                  status={opening.status}
                  date={dayjs(opening.createdAt).format("DD-MM-YYYY")}
                  requestId={opening.request_id || null}
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
