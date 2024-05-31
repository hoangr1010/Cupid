import natural from "natural";
import extractJobPostingText from "../job-posting.js";

const compatibilityFunction = async (resumeText, jobPostingURL) => {
  const jobPostingText = await extractJobPostingText(jobPostingURL);
  const similarity = natural.JaroWinklerDistance(resumeText, jobPostingText);
  const similarityPercentage = (Math.round(similarity * 10000) / 100).toFixed(
    2,
  );

  return similarityPercentage;
};

// For testing purposes:

// const resumeText = ``;

// const jobPostingURL = "";

// (async function () {
//   console.log(await compatibilityFunction(resumeText, jobPostingURL));
// })();
