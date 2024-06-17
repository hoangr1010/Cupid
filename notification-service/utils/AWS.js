import AWS from "aws-sdk";

if (process.env.NODE_ENV === "development") {
  AWS.config.update({
    region: "us-west-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
} else if (process.env.NODE_ENV === "production") {
  AWS.config.update({
    region: "us-west-1",
  });
}

export default AWS;
