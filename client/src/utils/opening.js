import { isGmailValid, isCompanyGmail } from "./gmail";

export const validateForm = (company, gmail, number) => {
  if (!company) {
    throw new Error("Please select a company");
  } else if (number < 1) {
    throw new Error("Please enter a number greater than 0");
  } else if (!isGmailValid(gmail)) {
    throw new Error("Please enter a valid gmail address");
  } 
  // else if (!isCompanyGmail(company.value, gmail)) {
  //   throw new Error("Please enter a valid company gmail address");
  // }
}