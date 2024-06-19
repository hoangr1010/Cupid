import { useState } from "react";
import OpeningInfoModal from "./OpeningInfoModal";
import { Table } from "flowbite-react";
import { getColorPair } from "../../utils/theme";
const dayjs = require("dayjs");

const TableView = ({ opening }) => {
  // Set of Request list
  const matchedRequestList = opening.requestList;
  const ReferredRequestList = matchedRequestList.filter(
    (request) => request.status === "referred",
  );
  const ApprovedRequestList = matchedRequestList.filter(
    (request) => request.status === "approved",
  );
  const ReferredApprovedRequestList = [
    ...ReferredRequestList,
    ...ApprovedRequestList,
  ];

  const requestListMap = {
    referred: ReferredRequestList,
    approved: ApprovedRequestList,
    all: ReferredApprovedRequestList,
  };

  // Set amount of requests
  const waitingAmount = opening.originalAmount - matchedRequestList.length;

  // tableView can be: "all", "referred", "approved"
  const [tableView, setTableView] = useState("all");

  // Group button color
  const colorMap = {
    referred: "purple",
    approved: "pink",
    all: "gray",
  };
  const [buttonBackgroundColor, buttonTextColor] = getColorPair(
    colorMap[tableView],
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <section>
        <h1 className="text-4xl font-bold font-darker">Referral Slots</h1>
        <p className="text-grayLight font-bold">
          There are {waitingAmount} available slots.
        </p>
      </section>

      <section>
        {/* BUTTON GROUP */}
        <div class="rounded-md mb-3" role="group">
          <button
            type="button"
            onClick={() => setTableView("approved")}
            class={
              tableView == "approved"
                ? `btn-padding font-bold border border-${buttonBackgroundColor} rounded-s-lg bg-${buttonBackgroundColor} text-${buttonTextColor}`
                : `btn-padding font-bold border border-${buttonBackgroundColor} rounded-s-lg hover:bg-gray-100`
            }
          >
            Waiting for Referral
          </button>
          <button
            type="button"
            onClick={() => setTableView("referred")}
            class={
              tableView == "referred"
                ? `btn-padding font-bold border-t border-b border-${buttonBackgroundColor} bg-${buttonBackgroundColor} text-${buttonTextColor} w-24`
                : `btn-padding font-bold border-t border-b border-${buttonBackgroundColor} hover:bg-gray-100 w-24`
            }
          >
            Referred
          </button>
          <button
            type="button"
            onClick={() => setTableView("all")}
            class={
              tableView == "all"
                ? `btn-padding font-bold border border-${buttonBackgroundColor} rounded-e-lg bg-${buttonBackgroundColor} text-${buttonTextColor} w-24`
                : `btn-padding font-bold border border-${buttonBackgroundColor} rounded-e-lg hover:bg-gray-100 w-24`
            }
          >
            All
          </button>
        </div>

        {requestListMap[tableView].length === 0 ? (
          <div className={`text-center w-96 bg-${buttonBackgroundColor} text-${buttonTextColor} font-bold p-1 rounded-md`}>
            There are currently no opening in the list
          </div>
        ) : (
          <>
            <Table className="w-fit" hoverable>
              <Table.Head>
                <Table.HeadCell>#</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">More</span>
                </Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {requestListMap[tableView].map((request, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <p className="font-bold">{index + 1}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-black">
                          {request.candidate_id.first_name}{" "}
                          {request.candidate_id.last_name}
                        </p>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {
                        {
                          referred: (
                            <p className="text-purpleDark font-bold">
                              Referred
                            </p>
                          ),
                          approved: (
                            <p className="text-pink font-bold">
                              Waiting for Referral
                            </p>
                          ),
                        }[request.status]
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {dayjs(request.createdAt).format("MMM DD")}
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
          </>
        )}
      </section>
    </div>
  );
};

export default TableView;
