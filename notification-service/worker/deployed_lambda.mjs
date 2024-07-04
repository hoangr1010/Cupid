const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { db } = require("./connectDB.js");

const REGION = "us-west-1";
const sesClient = new SESClient({ region: REGION });

const app_link = `https://cupid-production-frontend.vercel.app/`;

const getMessage = (msg) => {
  switch (msg.notiType) {
    case "matchingDoneCandidate":
      return (
        "The matching result is here. See if your requests were matched with any referrers " +
        "here".link(app_link) +
        "!"
      );

    case "matchingDoneReferrer":
      return (
        "The matching result is here. See your potential candidates " +
        "here".link(app_link) +
        "!"
      );

    case "candidateReplyRequest":
      return (
        "Your candidate has replied to your request. Check your opening " +
        "here".link(app_link) +
        "!"
      );

    case "refererRequestMoreInfo":
      return (
        "A referer requests more information from you. Check your request " +
        "here".link(app_link) +
        "!"
      );

    case "requestRemindAction":
      return (
        "Provide more information to expedite your referring process " +
        "here".link(app_link) +
        "!"
      );

    case "openingRemindAction":
      return (
        "Have you refered your candidates? Refer them " +
        "here".link(app_link) +
        "!"
      );

    default:
    // code
  }
};

const handler = async (event) => {
  const messages = event.Records;
  const asyncDocEmail = [];
  const asyncId = [];
  for (const message of messages) {
    const obj = JSON.parse(message.body);
    console.log(message.body);

    const params = {
      Destination: {
        ToAddresses: [obj.email],
      },
      Message: {
        Body: {
          Text: {
            Data: getMessage(obj),
          },
        },
        Subject: {
          Data: "You have a notification from Cupid",
        },
      },
      Source: "hiwecupid@gmail.com",
    };

    const docRef = db.collection(obj.recipientId.toString()).doc();
    const saveNotification = docRef.set(obj);
    asyncDocEmail.push(saveNotification);

    const docId = docRef.id;
    const addId = docRef.update({
      id: docId,
    });
    asyncId.push(addId);

    const sendEmail = await sesClient.send(new SendEmailCommand(params));
    asyncDocEmail.push(sendEmail);

    // try {
    //   console.log(obj);
    //   const docRef = db.collection("notifications").doc();
    //   const saveNotification = await docRef.set(obj);
    // } catch (err) {
    //   console.error("Error saving to firestore database");
    // }

    // try {
    //   const data = await sesClient.send(new SendEmailCommand(params));
    //   console.log("Email sent! Message ID:", data.MessageId);
    // } catch (err) {
    //   console.error("Error sending email:", err);
    // }
  }

  Promise.all(asyncDocEmail)
    .then((values) => console.log(values))
    .catch((err) => console.error(err));
  console.log("Email is sent and doc is pushed");

  Promise.all(asyncId)
    .then((values) => console.log(values))
    .catch((err) => console.error(err));
  console.log("Id on doc is added");
};

module.exports.handler = handler;
