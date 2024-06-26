import { getAllRequests, changeRequestPriority } from "../../api/request";
import { useEffect, useRef, useState } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import CreateRequest from "./CreateRequest";
import { reorderRequests } from "./../../utils/request";

import dayjs from "dayjs";
import { Spinner } from "flowbite-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import RequestBox from "./RequestBox";

const RequestDashboard = ({ user, requestList }) => {
  const dispatch = useDispatch();

  const [isLoadingDrag, setIsLoadingDrag] = useState(false);

  // Sort requests by priority
  const sortedRequestList = [...requestList].sort(
    (a, b) => a.priority - b.priority,
  );

  const handleOnDragEnd = async (result) => {
    if (!result.source) return;
    if (sortedRequestList[result.source.index - 1].status !== "waiting") return;
    if (!result.destination) return;
    if (sortedRequestList[result.destination.index - 1].status !== "waiting")
      return;

    setIsLoadingDrag(true);
    const newRequests = reorderRequests(
      [...(sortedRequestList || [])],
      result.source.index,
      result.destination.index,
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

  return (
    <>
      <div className="flex justify-between items-start self-stretch">
        <div className="flex">
          <div className="flex justify-center items-center border w-28 h-10 p-2 rounded-sm bg-alt">
            All
          </div>
          <div className="flex justify-center items-center border w-28 h-10 p-2 rounded-sm bg-alt">
            Active
          </div>
          <div className="flex justify-center items-center border w-28 h-10 p-2 rounded-sm bg-alt">
            Past
          </div>
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
                className={
                  isLoadingDrag ? "opacity-50 pointer-events-none" : ""
                }
              >
                {sortedRequestList.map((request) => (
                  <Draggable
                    key={request._id}
                    draggableId={request._id}
                    index={request.priority}
                  >
                    {(provided, snapshot) => (
                      <RequestBox
                        provided={provided}
                        key={request._id}
                        number={request.priority}
                        company={request.company}
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
