import {
  uploadFileToS3,
  delFileFromS3,
  uploadMultipleToS3,
} from "../services/s3.js";

export const loadResumeToS3 = async (req, res, next) => {
  if (req.file) {
    const userId = req.get("userId");
    const fileName = req.file.originalname;
    const path = `cupid-server-deployment-bucket/${userId}/user-resume`;
    const contentType = "application/pdf";

    uploadFileToS3(path, req.file, fileName, contentType);

    next();
  } else {
    res.status(400).send({ message: "No file uploaded" });
  }
};

export const loadFileRequestToS3 = async (req, res, next) => {
  if (req.file) {
    const requestId = req.get("requestId");
    const fileName = req.get("fileName");
    const userId = req.get("userId");
    const path = `cupid-server-deployment-bucket/${userId}/request/${requestId}`;
    const contentType = "application/pdf";

    uploadFileToS3(path, req.file, fileName, contentType);

    next();
  } else {
    console.log("No file to upload");
    res.status(400).send({ message: "No file to upload" });
  }
};

export const multipleFilesToS3 = async (req, res, next) => {
  if (req.files) {
    try {
      const requestId = req.get("requestId");
      const userId = req.get("userId");

      // console.log(requestId, userId)

      const path = `cupid-server-deployment-bucket/${userId}/request/${requestId}`;

      uploadMultipleToS3(req.files, path);

      next();
    } catch (error) {
      console.error("Error uploading files to S3:", error);
      res
        .status(500)
        .send({ message: "Error uploading files to S3", error: error.message });
    }
  } else {
    console.log("No file to upload");
    res.status(400).send({ message: "No file to upload" });
  }
};

export const delFileS3 = async (req, res, next) => {
  try {
    const { path } = req.body;
    delFileFromS3(path);
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
