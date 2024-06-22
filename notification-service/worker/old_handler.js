import AWS from "aws-sdk";

AWS.config.update({
  region: "us-west-1",
});

export const handler = async (event) => {
  const messages = event["Records"];

  const asyncDoAll = [];
  for (let message of messages) {
    const obj = JSON.parse(message.body);
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

    console.log("Email should have been sent");
  }

  Promise.all(asyncDoAll).then((values) => {
    console.log(values);
  });
};
