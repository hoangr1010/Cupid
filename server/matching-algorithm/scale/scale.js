import Request from "./../../src/models/Request.js";

export const scaleCalculate = async (requests) => {
  for (const request of requests) {
    let scale = 0;

    scale += millisecondsDiff(request.createdAt);
    scale -= priorityScale(request.priority);

    await Request.findByIdAndUpdate(request._id, { scale }, { new: true });
  }
};

const millisecondsDiff = (date) => {
  return Date.now() - date;
};

const priorityScale = (priority) => {
  const dayMilliseconds = 86400000;

  return dayMilliseconds * priority;
};
