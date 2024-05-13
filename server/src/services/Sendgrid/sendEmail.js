import sgMail from "@sendgrid/mail";

export const sendEmail = async (toAddress, fromAdress, subject, text, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: toAddress,
    from: fromAdress,
    subject,
    text,
    html,
  };

  try {
    const response = await sgMail
      .send(msg);
    console.log(`sent email to ${toAddress}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
