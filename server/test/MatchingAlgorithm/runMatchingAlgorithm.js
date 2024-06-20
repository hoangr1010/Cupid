import { runMatchingAlgorithm } from "../../matching-algorithm/index.js";

const inputRequests = [
  {
    _id: 1,
    company: "Google",
    candidate_id: 1,
    scale: 0,
  },
  {
    _id: 2,
    company: "Meta",
    candidate_id: 1,
    scale: 5,
  },
  {
    _id: 3,
    company: "Amazon",
    candidate_id: 1,
    scale: 6,
  },
  {
    _id: 4,
    company: "Google",
    candidate_id: 2,
    scale: 3,
  },
  {
    _id: 5,
    company: "LinkedIn",
    candidate_id: 2,
    scale: 4,
  },
  {
    _id: 6,
    company: "OpenAI",
    candidate_id: 2,
    scale: 9,
  },
  {
    _id: 7,
    company: "Amazon",
    candidate_id: 3,
    scale: 2,
  },
  {
    _id: 8,
    company: "Meta",
    candidate_id: 3,
    scale: 11,
  },
  {
    _id: 9,
    company: "OpenAI",
    candidate_id: 3,
    scale: 1,
  },
];

const inputOpeningsLess = [
  {
    _id: 1,
    company: "Google",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 2,
    company: "Meta",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 3,
    company: "Amazon",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 4,
    company: "OpenAI",
    original_amount: 2,
    request_id_list: [99],
  },
  {
    _id: 5,
    company: "OpenAI",
    original_amount: 1,
    request_id_list: [],
  },
];

const inputOpeningsMore = [
  {
    _id: 1,
    company: "Google",
    original_amount: 2,
    request_id_list: [],
  },
  {
    _id: 2,
    company: "Meta",
    original_amount: 3,
    request_id_list: [99],
  },
  {
    _id: 3,
    company: "Amazon",
    original_amount: 2,
    request_id_list: [],
  },
  {
    _id: 4,
    company: "OpenAI",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 5,
    company: "Google",
    original_amount: 2,
    request_id_list: [99],
  },
  {
    _id: 6,
    company: "Meta",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 7,
    company: "Amazon",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 8,
    company: "LinkedIn",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 9,
    company: "Twitter",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 10,
    company: "Tesla",
    original_amount: 1,
    request_id_list: [],
  },
];

const inputOpeningsSame = [
  {
    _id: 1,
    company: "Google",
    original_amount: 2,
    request_id_list: [99],
  },
  {
    _id: 2,
    company: "Meta",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 3,
    company: "Amazon",
    original_amount: 2,
    request_id_list: [99],
  },
  {
    _id: 4,
    company: "LinkedIn",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 5,
    company: "OpenAI",
    original_amount: 2,
    request_id_list: [],
  },
  {
    _id: 6,
    company: "OpenAI",
    original_amount: 1,
    request_id_list: [],
  },
  {
    _id: 7,
    company: "Twitter",
    original_amount: 2,
    request_id_list: [],
  },
];

const runMatchingAlgorithmTest = () => {
  describe("Run Matching Algorithm Test", () => {
    it("Matching Algorithm runs correctly when there are less openings than there are requests", () => {
      const matchingResult = runMatchingAlgorithm(
        inputRequests,
        inputOpeningsLess,
      );
      const expectedMatching = [
        [8, 2],
        [6, 4],
        [3, 3],
        [4, 1],
        [9, 5],
      ];
      expect(matchingResult).toEqual(expectedMatching);
    });

    it("Matching Algorithm runs correctly when there are more openings than there are requests", () => {
      const matchingResult = runMatchingAlgorithm(
        inputRequests,
        inputOpeningsMore,
      );
      const expectedMatching = [
        [8, 2],
        [6, 4],
        [3, 3],
        [2, 2],
        [5, 8],
        [4, 1],
        [7, 3],
        [1, 1],
      ];
      expect(matchingResult).toEqual(expectedMatching);
    });

    it("Matching Algorithm runs correctly when there are the same number of openings as the number of requests", () => {
      const matchingResult = runMatchingAlgorithm(
        inputRequests,
        inputOpeningsSame,
      );
      const expectedMatching = [
        [8, 2],
        [6, 5],
        [3, 3],
        [5, 4],
        [4, 1],
        [9, 5],
      ];
      expect(matchingResult).toEqual(expectedMatching);
    });
  });
};

export default runMatchingAlgorithmTest;
