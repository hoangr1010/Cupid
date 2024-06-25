import runGemini from "../../matching-algorithm/gemini-model.js";

const autoFill = async (resumeText) => {
  console.log(resumeText);
  try {
    const prompt =
      resumeText +
      "\n\n" +
      "Clean the string above so it's readable, can you give a JSON object from it without explanation in the format" +
      "{'education': [{'school', 'degree', 'major', 'gpa', 'start_year', 'end_year'}], 'experience': ['company', 'location', 'position', 'type', 'start_m', 'start_y','end_m', 'end_y', 'current', 'description'], 'project':['name', 'start_m', 'start_y','end_m', 'end_y', 'current', 'description', 'link'], 'portfolio': ['linkedin', 'github', 'website']}";
    const text = await runGemini(prompt);
    const cleanText = text.replace(/```/g, "").replace(/json/gi, "");
    const jsonObject = JSON.parse(cleanText);

    return jsonObject;
  } catch (err) {
    console.log(err);
  }
};

export default autoFill;
