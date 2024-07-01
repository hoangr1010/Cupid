import { getAllRequests, changeRequestPriority } from "../../api/request";
import { useEffect, useRef, useState } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import CreateRequest from "./CreateRequest";
import { reorderRequests } from "../../utils/request";
import { getColorPair } from "../../utils/theme.js";

import dayjs from "dayjs";
import { Spinner } from "flowbite-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import RequestBox from "./RequestBox";

const RequestDashboard = ({ requestList }) => {
  const [tableView, setTableView] = useState("waiting");
  const [isLoadingDrag, setIsLoadingDrag] = useState(false);
  const dispatch = useDispatch();

  // Group button color
  const colorMap = {
    all: "gray",
    waiting: "yellow",
    active: "pink",
    past: "purple",
  };
  const [buttonBackgroundColor, buttonTextColor] = getColorPair(
    colorMap[tableView],
  );

  console.log(buttonBackgroundColor);
  console.log(buttonTextColor);

  // Sort requests by priority
  const sortedRequestList = [...requestList].sort((a, b) => {
    return a.priority - b.priority;
  });

  const handleOnDragEnd = async (result) => {
    if (!result.source || !result.destination) return;

    const listBeingUsed = sortedRequestList.filter((request) => {
      if (tableView === "all") {
        return true;
      } else if (tableView === "waiting") {
        return request.status === "waiting";
      } else if (tableView === "active") {
        return request.status === "matched" || request.status === "approved";
      } else if (tableView === "past") {
        return request.status === "referred";
      }
    });

    const draggedItem = listBeingUsed[result.source.index];
    const draggedOverItem = listBeingUsed[result.destination.index];

    if (
      draggedItem.status !== "waiting" ||
      draggedOverItem.status !== "waiting"
    ) {
      toast.error("Cannot change priority of non-waiting requests");
      return;
    }

    console.log("Original");
    console.log(sortedRequestList);

    setIsLoadingDrag(true);

    const newRequests = reorderRequests(
      sortedRequestList,
      draggedItem.priority,
      draggedOverItem.priority,
    );
    console.log("Change prioirty after dnd");
    console.log(newRequests);

    if (newRequests) {
      try {
        const newRequestList = await changeRequestPriority(newRequests);
        console.log("Update prioirty in database");
        console.log(newRequestList);

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
      <div className="flex justify-between items-start self-stretch">
        <div className="rounded-md mb-3" role="group">
          <button
            type="button"
            onClick={() => setTableView("all")}
            className={
              tableView == "all"
                ? `btn-padding font-bold border border-${buttonBackgroundColor} rounded-s-lg bg-${buttonBackgroundColor} text-${buttonTextColor}`
                : `btn-padding font-bold border border-${buttonBackgroundColor} rounded-s-lg hover:bg-gray-100`
            }
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setTableView("waiting")}
            className={
              tableView == "waiting"
                ? `btn-padding font-bold border-t border-b border-${buttonBackgroundColor} bg-${buttonBackgroundColor} text-${buttonTextColor} w-24`
                : `btn-padding font-bold border-t border-b border-${buttonBackgroundColor} hover:bg-gray-100 w-24`
            }
          >
            Waiting
          </button>
          <button
            type="button"
            onClick={() => setTableView("active")}
            className={
              tableView == "active"
                ? `btn-padding font-bold border-t border-b border-${buttonBackgroundColor} bg-${buttonBackgroundColor} text-${buttonTextColor} w-24`
                : `btn-padding font-bold border-t border-b border-${buttonBackgroundColor} hover:bg-gray-100 w-24`
            }
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setTableView("past")}
            className={
              tableView == "past"
                ? `btn-padding font-bold border border-${buttonBackgroundColor} rounded-e-lg bg-${buttonBackgroundColor} text-${buttonTextColor} w-24`
                : `btn-padding font-bold border border-${buttonBackgroundColor} rounded-e-lg hover:bg-gray-100 w-24`
            }
          >
            Past
          </button>
        </div>

        <CreateRequest />
      </div>

      <div>
        {isLoadingDrag && (
          <Spinner
            className="fill-primary w-16 h-16 absolute left-1/2 top-1/4 z-10"
            aria-label="Loading"
          />
        )}

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex flex-col gap-6 ${isLoadingDrag ? "opacity-50 pointer-events-none" : ""}`}
              >
                {sortedRequestList
                  .filter((request) => {
                    if (tableView === "all") {
                      return true;
                    } else if (tableView === "waiting") {
                      return request.status === "waiting";
                    } else if (tableView === "active") {
                      return (
                        request.status === "matched" ||
                        request.status === "approved"
                      );
                    } else if (tableView === "past") {
                      return request.status === "referred";
                    }
                  })
                  .map((request, index) => (
                    <Draggable
                      key={request._id}
                      draggableId={request._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <RequestBox
                          provided={provided}
                          key={request._id}
                          number={request.priority}
                          company={request.company}
                          request={request}
                          requestedDate={dayjs(request.createdAt).format(
                            "MMM DD",
                          )}
                          activeSteps={
                            request.status == "waiting"
                              ? 1
                              : request.status == "matched"
                                ? 2
                                : request.status == "approved"
                                  ? 3
                                  : 4
                          }
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default RequestDashboard;
