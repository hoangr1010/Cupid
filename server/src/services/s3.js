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

const s3 = new AWS.S3();

export const uploadFileToS3 = async (path, file, fileName, contentType) => {
  try {
    const params = {
      Bucket: path,
      Key: fileName,
      Body: file.buffer,
      ContentType: contentType,
    };

    await s3.upload(params).promise();
  } catch (error) {
    console.log("fail load file to s3");
    console.log(error.message);
  }
};

export const delFileFromS3 = async (path) => {
  try {
    const params = {
      Bucket: `cupid-server-deployment-bucket`,
      Key: path.split(`cupid-server-deployment-bucket/`).pop(),
    };

    await s3.deleteObject(params).promise();
  } catch (error) {
    console.log(error);
  }
};
