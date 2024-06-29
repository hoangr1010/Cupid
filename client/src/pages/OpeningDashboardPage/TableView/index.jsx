import { useState } from "react";
import OpeningInfoModal from "../OpeningInfoModal";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { getColorPair } from "../../../utils/theme";
import QuickAction from "./QuickAction";
const dayjs = require("dayjs");

const TableView = () => {
  const matchedRequestList = useSelector((state) => state.opening.requestList);
  const totalAmount = useSelector((state) => state.opening.originalAmount);

  // Set of Request list
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
  const waitingAmount = totalAmount - matchedRequestList.length;

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
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-4xl font-bold font-darker">Referral Slots</h1>
        <p className="text-grayLight font-bold">
          There are {waitingAmount} available slots.
        </p>
      </section>

      <section>
        {/* BUTTON GROUP */}
        <div className="rounded-md mb-3" role="group">
          <button
            type="button"
            onClick={() => setTableView("approved")}
            className={
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
            className={
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
            className={
              tableView == "all"
                ? `btn-padding font-bold border border-${buttonBackgroundColor} rounded-e-lg bg-${buttonBackgroundColor} text-${buttonTextColor} w-24`
                : `btn-padding font-bold border border-${buttonBackgroundColor} rounded-e-lg hover:bg-gray-100 w-24`
            }
          >
            All
          </button>
        </div>

        {requestListMap[tableView].length === 0 ? (
          <div
            className={`text-center w-96 bg-${buttonBackgroundColor} text-${buttonTextColor} font-bold p-1 rounded-md`}
          >
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
                      <OpeningInfoModal
                        request={request}
                        Trigger={
                          <div className="flex items-center gap-2 cursor-pointer">
                            <p className="font-bold text-black">
                              {request.candidate_id.first_name}{" "}
                              {request.candidate_id.last_name}
                            </p>
                          </div>
                        }
                      />
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
                    {request.status != "referred" && (
                      <Table.Cell>
                        <QuickAction request={request} />
                      </Table.Cell>
                    )}
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
