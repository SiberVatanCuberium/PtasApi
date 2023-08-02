import { LeaveGateway } from "../gateways/leaveGateway.js";

export const test = async (req, res) => {
	return res.json({
		message: "It works!",
	});
};

export const testChaincode = async (req, res) => {
	const gateway = await LeaveGateway.new();
	const result = await gateway.hello();
	gateway.close();

	return res.json({
		message: result.message,
	});
};
