import mongoose from "mongoose";

const TEST_USER_ID = "663009c09004ced3b81eeaf1";
const USER_ID = "dummy";

const openingID1 = new mongoose.Types.ObjectId();
const openingID2 = new mongoose.Types.ObjectId();

const requestID2 = new mongoose.Types.ObjectId();
const requestID3 = new mongoose.Types.ObjectId();
const requestID4 = new mongoose.Types.ObjectId();
const requestID6 = new mongoose.Types.ObjectId();
const requestID7 = new mongoose.Types.ObjectId();
const requestID8 = new mongoose.Types.ObjectId();
const requestID9 = new mongoose.Types.ObjectId();
const requestID10 = new mongoose.Types.ObjectId();
const requestID11 = new mongoose.Types.ObjectId();
const requestID12 = new mongoose.Types.ObjectId();

const opening = {
  _id: openingID1,
  referrer_id: USER_ID,
  request_id_list: [requestID2, requestID3, requestID4],
  original_amount: 10,
  company: "Microsoft",
  // createdAt: "2022-01-01T00:00:00.000Z",
  // updatedAt: "2022-01-01T00:00:00.000Z",
};

const testUserRequest = [
  {
    candidate_id: TEST_USER_ID,
    company: "Google",
    priority: 1,
    status: "waiting",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
  },
  {
    _id: requestID2,
    candidate_id: TEST_USER_ID,
    opening_id: openingID1,
    company: "Vanta",
    priority: 2,
    status: "matched",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    scale: 5,
    compatibility: 80,
  },
  {
    _id: requestID3,
    candidate_id: TEST_USER_ID,
    opening_id: openingID1,
    company: "Palantir",
    priority: 3,
    status: "approved",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    scale: 5,
    compatibility: 50,
  },
  {
    _id: requestID4,
    candidate_id: TEST_USER_ID,
    opening_id: openingID1,
    company: "OpenAI",
    priority: 4,
    status: "matched",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    scale: 5,
    compatibility: 20,
  },
  {
    candidate_id: TEST_USER_ID,
    company: "Meta",
    priority: 2,
    status: "waiting",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
  },
];

const testUserOpening = {
  _id: openingID2,
  referrer_id: TEST_USER_ID,
  request_id_list: [requestID7, requestID8, requestID9],
  original_amount: 10,
  company: "Google",
  // createdAt: "2022-01-01T00:00:00.000Z",
  // updatedAt: "2022-01-01T00:00:00.000Z",
};

const requests = [
  {
    _id: requestID6,
    candidate_id: USER_ID,
    company: "Google",
    priority: 1,
    status: "waiting",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    InfoRequest: {
      isActive: false,
      Conversation: [],
    },
  },
  {
    _id: requestID7,
    candidate_id: USER_ID,
    opening_id: openingID2,
    company: "LinkedIn",
    priority: 2,
    status: "matched",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    scale: 5,
    compatibility: 80,
    InfoRequest: {
      isActive: true,
      Conversation: [{ sender: "referrer", message: "tao giet may" }],
    },
  },
  {
    _id: requestID8,
    candidate_id: USER_ID,
    opening_id: openingID2,
    company: "Palantir",
    priority: 3,
    status: "approved",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    scale: 5,
    compatibility: 55,
    InfoRequest: {
      isActive: false,
      Conversation: [],
    },
  },
  {
    _id: requestID9,
    candidate_id: USER_ID,
    opening_id: openingID2,
    company: "Vanta",
    priority: 4,
    status: "matched",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    scale: 5,
    compatibility: 20,
    InfoRequest: {
      isActive: true,
      Conversation: [{ sender: "referrer", message: "tao giet may" }],
    },
  },
  {
    _id: requestID10,
    candidate_id: USER_ID,
    company: "Amazon",
    priority: 5,
    status: "waiting",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    InfoRequest: {
      isActive: false,
      Conversation: [],
    },
  },
  {
    _id: requestID11,
    candidate_id: USER_ID,
    company: "Meta",
    priority: 6,
    status: "waiting",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    InfoRequest: {
      isActive: true,
      Conversation: [{ sender: "referrer", message: "tao giet may" }],
    },
  },
  {
    _id: requestID12,
    candidate_id: USER_ID,
    company: "Google",
    priority: 7,
    status: "waiting",
    job_posting_url: "https://www.amazon.jobs/en/jobs/2676956/business-analyst",
    InfoRequest: {
      isActive: false,
      Conversation: [],
    },
  },
];

export const userOpening = (userId) => {
  return { ...opening, referrer_id: userId };
};

export const testRequest = () => {
  return testUserRequest;
};

export const userRequest = (userId) => {
  return requests.map((request) => {
    return {
      ...request,
      candidate_id: userId,
    };
  });
};

export const testOpening = () => {
  return testUserOpening;
};
