import express from "express";
import multer from "multer";
import { createUser, updateResume, uploadResume } from "../controllers/User.js";
import { checkUserId } from "../middleware/User.js";
const UserRouter = express.Router();
const upload = multer({ dest: "resume" });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "server/resume");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

UserRouter.post("/create", createUser);
UserRouter.put("/resume", checkUserId, updateResume);

UserRouter.post("/upload", upload.single("resume"), uploadResume);

export default UserRouter;
