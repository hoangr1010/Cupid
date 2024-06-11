import { runMatchingAlgorithm } from "../../matching-algorithm";

export default runMatchingAlgorithmTest = () => {
  describe("Run Matching Algorithm Test", () => {
    it("Matching Algorithm runs correctly when there are less openings than there are requests", () => {
      const matchingResult = runMatchingAlgorithm(inputRequests, inputOpenings);
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
      const matchingResult = runMatchingAlgorithm(inputRequests, inputOpenings);
    });

    it("Matching Algorithm runs correctly when there are the same number of openings as the number of requests", () => {
      const matchingResult = runMatchingAlgorithm(inputRequests, inputOpenings);
    });
  });
};

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
  },
  {
    _id: 2,
    company: "Meta",
  },
  {
    _id: 3,
    company: "Amazon",
  },
  {
    _id: 4,
    company: "OpenAI",
  },
  {
    _id: 5,
    compnay: "OpenAI",
  },
  {
    _id: 6,
    company: "OpenAI",
  },
];

const inputOpeningsMore = [
  {
    _id: 1,
    company: "Google",
  },
  {
    _id: 2,
    company: "Meta",
  },
  {
    _id: 3,
    company: "Amazon",
  },
  {
    _id: 4,
    company: "OpenAI",
  },
  {
    _id: 5,
    compnay: "Amazon",
  },
  {
    _id: 6,
    company: "Google",
  },
  {
    _id: 7,
    company: "Google",
  },
  {
    _id: 8,
    company: "Meta",
  },
  {
    _id: 9,
    company: "Amazon",
  },
  {
    _id: 10,
    company: "LinkedIn",
  },
  {
    _id: 11,
    compnay: "Twitter",
  },
  {
    _id: 12,
    company: "Tesla",
  },
];

const inputOpeningsSame = [
  {
    _id: 1,
    company: "Google",
  },
  {
    _id: 2,
    company: "Meta",
  },
  {
    _id: 3,
    company: "Amazon",
  },
  {
    _id: 4,
    company: "Google",
  },
  {
    _id: 5,
    compnay: "LinkedIn",
  },
  {
    _id: 6,
    company: "OpenAI",
  },
  {
    _id: 7,
    company: "Amazon",
  },
  {
    _id: 8,
    compnay: "Meta",
  },
  {
    _id: 9,
    company: "OpenAI",
  },
];
