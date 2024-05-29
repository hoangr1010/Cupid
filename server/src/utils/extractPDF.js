import pdf from "pdf-parse";
import axios from "axios";
export const getResumeFromS3 = async (resume_url) => {
  const pdfUrl = resume_url;

  const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
  return response.data;
};

const parsePdf = async (filePath) => {
  try {
    const dataBuffer = await getResumeFromS3(filePath);
    const data = await pdf(dataBuffer);

    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
  }
};

export default parsePdf;
