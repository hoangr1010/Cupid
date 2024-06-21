import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";
import db from "../utils/connectDB.js";

AWS.config.update({
  region: "us-west-1",
});

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const queueURL = process.env.SQS_QUEUE_URL;

const queueParams = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

sqs.receiveMessage(queueParams, function (err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    // Do something with the some data at the front of the queue
    const asyncDoAll = [];
    for (let message of data.Messages) {
      const obj = JSON.parse(message.Body);
      var emailParams = {
        Destination: {
          ToAddresses: ["test@deadapple.simplelogin.com"],
        },
        Message: {
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: JSON.stringify(obj),
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "SES Subject",
          },
        },
        Source: "hiwecupid@gmail.com",
        ReplyToAddresses: ["hiwecupid@gmail.com"],
      };

      const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
        .sendEmail(emailParams)
        .promise();
      asyncDoAll.push(sendPromise);

      const docRef = db.collection("notifications").doc();
      const saveNotification = docRef.set(obj);
      asyncDoAll.push(saveNotification);
    }

    Promise.all(asyncDoAll).then((values) => {
      console.log(values);
    });

    // Pop data off the queue
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
    };
    sqs.deleteMessage(deleteParams, function (err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});
