import AWS from "../utils/AWS.js";

const sqs = new AWS.SQS({ region: 'us-west-1' });

const queueUrl = `https://sqs.us-west-1.amazonaws.com/071752151881/SQSProcessor`;

export const sendMessageToQueue = async (msg) => {
  try {
    const params = {
      MessageBody: msg,
      QueueUrl: queueUrl,
    };
    console.log("before sending msg to queue");
    console.log(params);

    await sqs.sendMessage(params).promise();

  } catch (error) {
    console.log(error);
  }
}