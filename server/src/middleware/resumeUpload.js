import AWS from "aws-sdk";

export const loadResumeToS3 = async (req, res, next) => {
  console.log("load resume to s3");

  if (process.env.REACT_APP_ENVIRONMENT === "development") {
    AWS.config.update({
      region: "us-west-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  } else if (process.env.REACT_APP_ENVIRONMENT === "production") {
    AWS.config.update({
      region: "us-west-1",
    });
  }

  const s3 = new AWS.S3();

  try {
    if (req.file) {
      const userId = req.get("userId");

      const params = {
        Bucket: `cupid-server-deployment-bucket/user-resume/${userId}`,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: "application/pdf",
      };

      await s3.upload(params).promise();

      next();
    } else {
      res.status(400).send({ message: "No file uploaded" });
    }
  } catch (err) {
    console.log("fail load resume to s3");
    console.log(err.message);
    return res.status(401).send({ message: err.message });
  }
};
