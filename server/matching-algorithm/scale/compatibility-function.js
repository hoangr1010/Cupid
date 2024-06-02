import natural from "natural";
import extractJobPostingText from "../job-posting.js";

const compatibilityFunction = async (resumeText, jobPostingText) => {
  const similarity = natural.JaroWinklerDistance(resumeText, jobPostingText);
  const similarityPercentage = (Math.round(similarity * 10000) / 100).toFixed(
    2,
  );

  return similarityPercentage;
};

// For testing purposes:

// const resumeText = ``;

// const jobPostingURL =
//   "https://www.github.careers/careers-home/jobs/2958?lang=en-us";

// const jobPostingText = await extractJobPostingText(jobPostingURL);

// (async function () {
//   console.log(await compatibilityFunction(resumeText, jobPostingText));
// })();

export default compatibilityFunction;
