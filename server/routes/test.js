import express from 'express';
import { testSayHello } from './../controllers/test.js'

const testRouter = express.Router();

testRouter.get('/', testSayHello);

export default testRouter;