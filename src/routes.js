import express from "express";
import * as adminsController from "./controllers/admins.js";
import * as leaveRequestsController from "./controllers/leaveRequests.js";
import * as personnelsController from "./controllers/personnels.js";
import * as testController from "./controllers/test.js";

export const router = express.Router();

// TEST
router.get("/test", testController.test);
router.get("/testChaincode", testController.testChaincode);

// ADMINS
router.post("/admins", adminsController.add);

// PERSONNELS
router.get("/personnels", personnelsController.getAll);
router.post("/personnels", personnelsController.add);

// LEAVE REQUESTS
router.get("/leaveRequests", leaveRequestsController.getAll);
router.get("/leaveRequests/:leaveRequestId", leaveRequestsController.getById);
router.post("/leaveRequests", leaveRequestsController.add);
router.post(
	"/leaveRequests/:leaveRequestId/approve",
	leaveRequestsController.approve
);
router.post(
	"/leaveRequests/:leaveRequestId/reject",
	leaveRequestsController.reject
);
router.post(
	"/leaveRequests/:leaveRequestId/withdraw",
	leaveRequestsController.withdraw
);
