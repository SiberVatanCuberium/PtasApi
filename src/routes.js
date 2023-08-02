import express from "express";
import * as testController from "./controllers/test.js";

export const router = express.Router();

router.use("/test", testController.test);
router.use("/testChaincode", testController.testChaincode);
