import { toast } from "sonner";

// This function get drag priority and draggedOver priority and requestArray
// it will perform reorder request priority and return new requestArray
export const reorderRequests = (
  requestArray,
  dragPriority,
  draggedOverPriority,
) => {
  // get all waiting requests
  let waitingRequests = requestArray.filter(
    (request) => request.status === "waiting",
  );

  // get object of dragRow and draggedOverRow
  const dragRowObj = requestArray.find(
    (request) => request.priority === dragPriority,
  );
  const draggedOverRowObj = requestArray.find(
    (request) => request.priority === draggedOverPriority,
  );

  // if dragRow or draggedOverRow is not in waiting status, return
  if (
    draggedOverRowObj.status !== "waiting" ||
    dragRowObj.status !== "waiting"
  ) {
    toast.error("You are not allowed to replace non-waiting request");
    return;
  }

  // remove dragRow from updatedRequestList
  waitingRequests = waitingRequests.filter(
    (request) => request.priority !== dragPriority,
  );
  const draggedOverRowIndex = waitingRequests.findIndex(
    (request) => request.priority === draggedOverPriority,
  );

  // get the left and right side of the draggedOverRow
  let left, right;
  if (dragPriority > draggedOverPriority) {
    left = waitingRequests.slice(0, draggedOverRowIndex);
    right = waitingRequests.slice(draggedOverRowIndex);
  } else {
    left = waitingRequests.slice(0, draggedOverRowIndex + 1);
    right = waitingRequests.slice(draggedOverRowIndex + 1);
  }

  // insert dragRow in between the left and right side of the draggedOverRow
  waitingRequests = [...left, dragRowObj, ...right];

  // reorder the priority
  const newRequests = requestArray.map((request, index) => {
    if (request.status === "waiting") {
      let waitingRequest = { ...waitingRequests.shift() };
      waitingRequest.priority = index + 1;
      return waitingRequest;
    }
    return request;
  });

  return newRequests;
};

export const getFileName = (path) => {
  const pathArray = path.split("/");
  return pathArray[pathArray.length - 1];
};

export const validateFileName = (request, name) => {
  if (!name) {
    throw new Error("No file name");
    // toast.error("No file name");
    // return false;
  }

  request.request.request.request_files.forEach((element) => {
    if (name === getFileName(element)) {
      throw new Error("File name existed");
      // toast.error("File name existed");
      // return false
    }
  });

  return true;
};

export const fileValidate = (uploadFiles, currFile) => {
  console.log(uploadFiles);

  for (let i = 0; i < uploadFiles.length; i++) {
    if (currFile.name === uploadFiles[i].name) {
      toast.error("file existed");
      return false;
    }
  }

  return true;
};
