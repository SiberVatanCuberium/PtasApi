import { LeaveGateway } from "../gateways/leaveGateway.js";

export const getAll = async (req, res) => {
	const gateway = await LeaveGateway.new();
	const result = await gateway.getPersonnels("CUB_user_personnel12312312301");
	gateway.close();

	return res.json({
		ok: true,
		data: result.personnels,
	});
};

export const add = async (req, res) => {
	const { nationalId, name, surname, birthDate, title } = req.body;

	if (!nationalId || !name || !surname || !birthDate || !title) {
		return res.json({
			ok: false,
			message: "Lütfen tüm gerekli alanları doldurun.",
		});
	}

	const gateway = await LeaveGateway.new();
	const result = await gateway.addPersonnel(
		"CUB_user_personnel12312312301",
		nationalId,
		name,
		surname,
		birthDate,
		title
	);
	gateway.close();

	return res.json({
		ok: true,
	});
};
