const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { db } = require("./connectDB.js");

const REGION = "us-west-1";
const sesClient = new SESClient({ region: REGION });

const handler = async (event) => {
  const messages = event.Records;
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

    try {
      const data = await sesClient.send(new SendEmailCommand(params));
      console.log("Email sent! Message ID:", data.MessageId);
    } catch (err) {
      console.error("Error sending email:", err);
    }

    try {
      console.log(obj);
      const docRef = db.collection("notifications").doc();
      const saveNotification = await docRef.set(obj);
    } catch (err) {
      console.error("Error saving to firestore database");
    }
  }
};

module.exports.handler = handler;
