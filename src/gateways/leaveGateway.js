import { CONFIG } from "../config.js";
import { GatewayBase } from "../lib/gatewayBase.js";

export class LeaveGateway extends GatewayBase {
	constructor() {
		super("mychannel", CONFIG.CHAINCODE_NAME);
	}

	static async new() {
		const gateway = new LeaveGateway();
		await gateway._init();
		return gateway;
	}

	async hello() {
		return this._evaluateTransaction("hello");
	}

	// ADMINS

	async addAdmin(callerUserId, nationalId, name, surname, birthDate, title) {
		return this._submitTransaction(
			"addAdmin",
			callerUserId,
			nationalId,
			name,
			surname,
			birthDate,
			title
		);
	}

	// PERSONNELS

	async getPersonnels(callerUserId) {
		return this._evaluateTransaction("getPersonnels", callerUserId);
	}

	async addPersonnel(
		callerUserId,
		nationalId,
		name,
		surname,
		birthDate,
		title
	) {
		return this._submitTransaction(
			"addPersonnel",
			callerUserId,
			nationalId,
			name,
			surname,
			birthDate,
			title
		);
	}

	// LEAVE REQUESTS

	async getLeaveRequests(callerUserId) {
		return this._evaluateTransaction("getLeaveRequests", callerUserId);
	}

	async getLeaveRequestById(callerUserId, leaveRequestId) {
		return this._evaluateTransaction(
			"getLeaveRequestById",
			callerUserId,
			leaveRequestId
		);
	}

	async createLeaveRequest(callerUserId, date, beginningTime, endTime, reason) {
		return this._submitTransaction(
			"createLeaveRequest",
			callerUserId,
			date,
			beginningTime,
			endTime,
			reason
		);
	}

	async approveLeaveRequest(callerUserId, leaveRequestId) {
		return this._submitTransaction(
			"approveLeaveRequest",
			callerUserId,
			leaveRequestId
		);
	}

	async rejectLeaveRequest(callerUserId, leaveRequestId) {
		return this._submitTransaction(
			"rejectLeaveRequest",
			callerUserId,
			leaveRequestId
		);
	}

	async withdrawLeaveRequest(callerUserId, leaveRequestId) {
		return this._submitTransaction(
			"withdrawLeaveRequest",
			callerUserId,
			leaveRequestId
		);
	}
}
