import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import runGemini from "./gemini-model.js";

const extractJobPostingText = async (jobPostingURL) => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(jobPostingURL);
    await driver.sleep(1000);
    let body = await driver.findElement(By.css("body"));
    let value = await body.getText();

    const prompt =
      value +
      "\n\n" +
      "Given the string above, can you extract the part of the string that is the actual content of the primary job posting?";

    const jobPostingText = await runGemini(prompt);

    return jobPostingText;
  } catch (err) {
    console.error(err);
  } finally {
    await driver.quit();
  }
};

// For testing purposes:

// try {
//   const content = "";

//   fs.writeFileSync("./matching-algorithm/a.txt", content);
//   // file written successfully
// } catch (err) {
//   console.error(err);
// }

export default extractJobPostingText;
