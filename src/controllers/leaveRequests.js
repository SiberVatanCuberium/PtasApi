import { LeaveGateway } from "../gateways/leaveGateway.js";

export const getAll = async (req, res) => {
	const gateway = await LeaveGateway.new();
	const result = await gateway.getLeaveRequests(
		"CUB_user_personnel12312312301"
	);
	gateway.close();

	return res.json({
		ok: true,
		data: result.leaveRequests,
	});
};

export const getById = async (req, res) => {
	const { leaveRequestId } = req.params;

	if (!leaveRequestId) {
		return res.json({
			ok: false,
			message: "URL'in bazı bölümleri eksik.",
		});
	}

	const gateway = await LeaveGateway.new();
	const result = await gateway.getLeaveRequestById(
		"CUB_user_personnel12312312301",
		leaveRequestId
	);
	gateway.close();

	return res.json({
		ok: true,
		data: result.personnel,
	});
};

export const add = async (req, res) => {
	const { date, beginningTime, endTime, reason } = req.body;

	if (!date || !beginningTime || !endTime || !reason) {
		return res.json({
			ok: false,
			message: "Lütfen tüm gerekli alanları doldurun.",
		});
	}

	const gateway = await LeaveGateway.new();
	const result = await gateway.createLeaveRequest(
		"CUB_user_personnel12312312301",
		date,
		beginningTime,
		endTime,
		reason
	);
	gateway.close();

	return res.json({
		ok: true,
	});
};

export const approve = async (req, res) => {
	const { leaveRequestId } = req.params;

	if (!leaveRequestId) {
		return res.json({
			ok: false,
			message: "URL'in bazı bölümleri eksik.",
		});
	}

	const gateway = await LeaveGateway.new();
	const result = await gateway.approveLeaveRequest(
		"CUB_user_personnel12312312301",
		leaveRequestId
	);
	gateway.close();

	return res.json({
		ok: true,
		data: result.personnel,
	});
};

export const reject = async (req, res) => {
	const { leaveRequestId } = req.params;

	if (!leaveRequestId) {
		return res.json({
			ok: false,
			message: "URL'in bazı bölümleri eksik.",
		});
	}

	const gateway = await LeaveGateway.new();
	const result = await gateway.rejectLeaveRequest(
		"CUB_user_personnel12312312301",
		leaveRequestId
	);
	gateway.close();

	return res.json({
		ok: true,
		data: result.personnel,
	});
};

export const withdraw = async (req, res) => {
	const { leaveRequestId } = req.params;

	if (!leaveRequestId) {
		return res.json({
			ok: false,
			message: "URL'in bazı bölümleri eksik.",
		});
	}

	const gateway = await LeaveGateway.new();
	const result = await gateway.withdrawLeaveRequest(
		"CUB_user_personnel12312312301",
		leaveRequestId
	);
	gateway.close();

	return res.json({
		ok: true,
		data: result.personnel,
	});
};
