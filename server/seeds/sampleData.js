import mongoose from "mongoose";

const TEST_USER_ID = "663009c09004ced3b81eeaf1";
const USER_ID = "dummy";

const openingID1 = new mongoose.Types.ObjectId();
const openingID2 = new mongoose.Types.ObjectId();
const openingID3 = new mongoose.Types.ObjectId();
const openingID4 = new mongoose.Types.ObjectId();
const openingID5 = new mongoose.Types.ObjectId();
const openingID7 = new mongoose.Types.ObjectId();
const openingID8 = new mongoose.Types.ObjectId();
const openingID9 = new mongoose.Types.ObjectId();

const requestID2 = new mongoose.Types.ObjectId();
const requestID3 = new mongoose.Types.ObjectId();
const requestID4 = new mongoose.Types.ObjectId();
const requestID6 = new mongoose.Types.ObjectId();
const requestID7 = new mongoose.Types.ObjectId();
const requestID8 = new mongoose.Types.ObjectId();
const requestID9 = new mongoose.Types.ObjectId();
const requestID10 = new mongoose.Types.ObjectId();

const openings = [
  {
    _id: openingID1,
    referrer_id: USER_ID,
    company: "Google",
    status: "waiting",
  },
  {
    _id: openingID2,
    referrer_id: USER_ID,
    request_id: requestID2,
    company: "Amazon",
    status: "matched",
  },
  {
    _id: openingID3,
    referrer_id: USER_ID,
    request_id: requestID3,
    company: "Neflix",
    status: "approved",
  },
  {
    _id: openingID4,
    referrer_id: USER_ID,
    request_id: requestID4,
    company: "Apple",
    status: "referred",
  },
  {
    _id: openingID5,
    referrer_id: USER_ID,
    company: "Meta",
    status: "waiting",
  },
];

const testUserRequest = [
  {
    candidate_id: TEST_USER_ID,
    company: "Google",
    priority: 1,
    status: "waiting",
    scale: 5,
  },
  {
    _id: requestID2,
    candidate_id: TEST_USER_ID,
    opening_id: openingID2,
    company: "Amazon",
    priority: 2,
    status: "matched",
    scale: 4,
  },
  {
    _id: requestID3,
    candidate_id: TEST_USER_ID,
    opening_id: openingID3,
    company: "Netflix",
    priority: 3,
    status: "approved",
    scale: 3,
  },
  {
    _id: requestID4,
    candidate_id: TEST_USER_ID,
    opening_id: openingID4,
    company: "Apple",
    priority: 4,
    status: "referred",
    scale: 2,
  },
  {
    candidate_id: TEST_USER_ID,
    opening_id: openingID5,
    company: "Meta",
    priority: 5,
    status: "waiting",
    scale: 1,
  },
];

const requests = [
  {
    _id: requestID6,
    candidate_id: USER_ID,
    company: "Google",
    priority: 1,
    status: "waiting",
    scale: 5,
  },
  {
    _id: requestID7,
    candidate_id: USER_ID,
    opening_id: openingID7,
    company: "Amazon",
    priority: 2,
    status: "matched",
    scale: 4,
  },
  {
    _id: requestID8,
    candidate_id: USER_ID,
    opening_id: openingID8,
    company: "Neflix",
    priority: 3,
    status: "approved",
    scale: 3,
  },
  {
    _id: requestID9,
    candidate_id: USER_ID,
    opening_id: openingID9,
    company: "Apple",
    priority: 4,
    status: "referred",
    scale: 2,
  },
  {
    _id: requestID10,
    candidate_id: USER_ID,
    company: "Meta",
    priority: 5,
    status: "waiting",
    scale: 1,
  },
];

const testUserOpening = [
  {
    referrer_id: TEST_USER_ID,
    company: "Google",
    status: "waiting",
  },
  {
    _id: openingID7,
    referrer_id: TEST_USER_ID,
    request_id: requestID7,
    company: "Amazon",
    status: "matched",
  },
  {
    _id: openingID8,
    referrer_id: TEST_USER_ID,
    request_id: requestID8,
    company: "Neflix",
    status: "approved",
  },
  {
    _id: openingID9,
    referrer_id: TEST_USER_ID,
    request_id: requestID9,
    company: "Apple",
    status: "referred",
  },
  {
    referrer_id: TEST_USER_ID,
    company: "Meta",
    status: "waiting",
  },
];

export const userOpening = (userId) => {
  return openings.map((opening) => {
    return {
      ...opening,
      referrer_id: userId,
    };
  });
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
