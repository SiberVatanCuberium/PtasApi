import { LeaveGateway } from "../gateways/leaveGateway.js";

export const add = async (req, res) => {
	const { nationalId, name, surname, birthDate, title } = req.body;

	if (!nationalId || !name || !surname || !birthDate || !title) {
		return res.json({
			ok: false,
			message: "Lütfen tüm alanları doldurun.",
		});
	}

	const gateway = await LeaveGateway.new();
	const result = await gateway.addAdmin("CUB_user_personnel12312312301");
	gateway.close();

	return res.json({
		ok: true,
		data: result,
	});
};
