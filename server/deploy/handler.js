import app from "./../index.js";
import serverless from "serverless-http";
console.log(app);

export const api = serverless(app);