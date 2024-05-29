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

  const nonWaitingOpeningList = openingList.filter(
    (opening) => opening.status != "waiting",
  );
  const waitingOpeningList = openingList.filter(
    (opening) => opening.status === "waiting",
  );

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
      <h1 className="text-4xl font-bold font-darker mb-3">Opening Slots</h1>
      <p className="text-grayLight font-bold mb-2">
        Opening Slots: {waitingOpeningList.length}
      </p>
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
          {nonWaitingOpeningList.map((opening, index) => (
            <Table.Row key={opening._id} className="bg-white">
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2 text-black">
                  <p
                    className={
                      opening.status == "matched" ||
                      opening.status == "approved"
                        ? "font-bold"
                        : null
                    }
                  >
                    {opening.request_id.candidate_id.first_name}{" "}
                    {opening.request_id.candidate_id.last_name}
                  </p>
                  {(opening.status == "matched" ||
                    opening.status == "approved") && (
                    <div class="h-3 w-3 rounded-full bg-red-500"></div>
                  )}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="w-fit">
                  <StatusBadge status={opening.status} />
                </div>
              </Table.Cell>
              <Table.Cell>
                {dayjs(opening.createdAt).format("DD MMM")}
              </Table.Cell>
              <Table.Cell>
                <OpeningInfoModal
                  openingId={opening._id}
                  company={opening.company}
                  status={opening.status}
                  date={dayjs(opening.createdAt).format("DD MMM YYYY")}
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
