export const isGmailValid = (gmail) => {
  // Regular expression pattern for validating Gmail addresses
  const gmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the email matches the Gmail pattern
  return gmailPattern.test(gmail);
};

export const isCompanyGmail = (companyName, gmail) => {
  // function to check if the company name matches the domain of the email
  const gmailDomain = gmail.split("@")[1]?.split(".")[0];
  const companyWords = companyName.toLowerCase().split(" ");
  return companyWords.some((word) => gmailDomain.includes(word));
};
