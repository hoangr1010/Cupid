import app from "./index.js";
import serverless from "serverless-http";
import algorithmFunction from "./matching-algorithm/index.js"

export const api = serverless(app);

export const algorithm = algorithmFunction;