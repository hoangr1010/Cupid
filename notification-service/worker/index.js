import dotenv from "dotenv";
dotenv.config();
// Load the AWS SDK for Node.js
import AWS from "aws-sdk";

// Set the region
AWS.config.update({
  region: "us-west-1",
});

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

var queueURL = process.env.SQS_QUEUE_URL;

var queueParams = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

// Create sendEmail params
var emailParams = {
  Destination: {
    /* required */
    ToAddresses: [
      "huyhoangr1010@gmail.com",
      /* more items */
    ],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Text: {
        Charset: "UTF-8",
        Data: "Email Body",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "SES Subject",
    },
  },
  Source: "hiwecupid@gmail.com" /* required */,
  ReplyToAddresses: [
    "hiwecupid@gmail.com",
    /* more items */
  ],
};

sqs.receiveMessage(queueParams, function (err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    // Do something with the some data at the front of the queue
    // Create the promise and SES service object
    let sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(emailParams)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function (data) {
        console.log(data.MessageId);
      })
      .catch(function (err) {
        console.error(err, err.stack);
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
