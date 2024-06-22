const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { db } = require("./connectDB.js");

const REGION = "us-west-1";
const sesClient = new SESClient({ region: REGION });

const handler = async (event) => {
  const messages = event.Records;
  const asyncDoAll = [];
  for (const message of messages) {
    const obj = JSON.parse(message.body);

    const params = {
      Destination: {
        ToAddresses: ["huyhoangr1010@gmail.com"],
      },
      Message: {
        Body: {
          Text: {
            Data: message.body,
          },
        },
        Subject: {
          Data: "Test email subject",
        },
      },
      Source: "hiwecupid@gmail.com",
    };

    const docRef = db.collection("notifications").doc();
    const saveNotification = docRef.set(obj);
    asyncDoAll.push(saveNotification);

    const sendEmail = await sesClient.send(new SendEmailCommand(params));
    asyncDoAll.push(sendEmail);

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

  Promise.all(asyncDoAll)
    .then((values) => console.log(values))
    .catch((err) => console.error(err));
};

module.exports.handler = handler;
