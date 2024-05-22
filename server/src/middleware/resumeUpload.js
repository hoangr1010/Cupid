import AWS from "aws-sdk";

export const loadResumeToS3 = async (req, res, next) => {
  console.log(req);
  console.log("load resume to s3");

  AWS.config.update({
    region: "us-west-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

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

      const data = await s3.upload(params).promise();
      console.log("Upload successful:", data.Key);

      console.log(data);

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
