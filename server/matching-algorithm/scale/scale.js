import Request from "./../../src/models/Request.js";
import User from "./../../src/models/User.js";
import extractJobPostingText from "./../job-posting.js";
import compatibilityFunction from "./compatibility-function.js";

export const scaleCalculate = async (requests) => {
  for (const request of requests) {
    let scale = 0;

    scale += millisecondsDiff(request.createdAt);
    scale -= priorityScale(request.priority);

    const compatibility = await compatibilityScale(request);
    scale += compatibility;

    await Request.findByIdAndUpdate(
      request._id,
      {
        scale,
        compatibility: compatibility / 3600000,
      },
      { new: true },
    );
  }
};

const millisecondsDiff = (date) => {
  return Date.now() - date;
};

const priorityScale = (priority) => {
  const dayMilliseconds = 86400000;
  return dayMilliseconds * priority;
};

const compatibilityScale = async (request) => {
  const jobPostingText = await extractJobPostingText(request.job_posting_url);

  const resumeText = (
    await Request.findById(request._id).populate("candidate_id").exec()
  ).candidate_id.resume.text;

  const compatibility = await compatibilityFunction(jobPostingText, resumeText);

  const hourMilliSeconds = 3600000;
  return hourMilliSeconds * compatibility;
};
