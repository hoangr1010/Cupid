import pdf from "pdf-parse";
import axios from "axios";
export const getResumeFromS3 = async (resume_url) => {
  const pdfUrl = resume_url;

  const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
  return response.data;
};

export const parsePdfFromBuffer = async (fileBuffer) => {
  try {
    const data = await pdf(fileBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
  }
};

const parsePdf = async (filePath) => {
  try {
    const dataBuffer = await getResumeFromS3(filePath);
    return parsePdfFromBuffer(dataBuffer);
  } catch (error) {
    console.error("Error parsing PDF:", error);
  }
};

export default parsePdf;
