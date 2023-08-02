import { LeaveGateway } from "../gateways/leaveGateway.js";

export const getAll = async (req, res) => {
	const gateway = await LeaveGateway.new();
	const result = await gateway.getLeaveRequests("FOOBAR123");
	gateway.close();

	return res.json({
		ok: true,
		data: result.personnels,
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
	const result = await gateway.getLeaveRequestById("FOOBAR123", leaveRequestId);
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
		"FOOBAR123",
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
	const result = await gateway.approveLeaveRequest("FOOBAR123", leaveRequestId);
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
	const result = await gateway.rejectLeaveRequest("FOOBAR123", leaveRequestId);
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
		"FOOBAR123",
		leaveRequestId
	);
	gateway.close();

	return res.json({
		ok: true,
		data: result.personnel,
	});
};
