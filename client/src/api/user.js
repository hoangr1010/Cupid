import API from ".";
import { toast } from "sonner";

export const sendResumeLink = async (resumeLink) => {

  const response = await API.put(`/user/resume`, resumeLink);
  console.log(response);
}