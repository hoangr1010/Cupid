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
    company: "Microsoft",
    priority: 1,
    status: "waiting",
  },
  {
    _id: requestID2,
    candidate_id: TEST_USER_ID,
    opening_id: openingID1,
    company: "Microsoft",
    priority: 2,
    status: "matched",
  },
  {
    _id: requestID3,
    candidate_id: TEST_USER_ID,
    opening_id: openingID1,
    company: "Microsoft",
    priority: 3,
    status: "approved",
  },
  {
    _id: requestID4,
    candidate_id: TEST_USER_ID,
    opening_id: openingID1,
    company: "Microsoft",
    priority: 4,
    status: "referred",
  },
  {
    candidate_id: TEST_USER_ID,
    company: "Microsoft",
    priority: 2,
    status: "waiting",
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
  },
  {
    _id: requestID7,
    candidate_id: USER_ID,
    opening_id: openingID2,
    company: "Google",
    priority: 2,
    status: "matched",
  },
  {
    _id: requestID8,
    candidate_id: USER_ID,
    opening_id: openingID2,
    company: "Google",
    priority: 3,
    status: "approved",
  },
  {
    _id: requestID9,
    candidate_id: USER_ID,
    opening_id: openingID2,
    company: "Google",
    priority: 4,
    status: "referred",
  },
  {
    _id: requestID10,
    candidate_id: USER_ID,
    company: "Google",
    priority: 5,
    status: "waiting",
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
