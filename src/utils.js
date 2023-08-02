// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { CONFIG } from "./config.js";

// export const hashPassword = async (plaintextPassword) => {
// 	return bcrypt.hash(plaintextPassword, 10);
// };

// export const checkPasswordWithHash = async (
// 	plaintextPassword,
// 	hashedPassword
// ) => {
// 	return bcrypt.compare(plaintextPassword, hashedPassword);
// };

// export const createTokenForAdmin = (admin) => {
// 	const payload = {};
// 	return jwt.sign(payload, CONFIG.JWT_SECRET, {
// 		expiresIn: "16h",
// 	});
// };

// export const createTokenForCustomer = (customer) => {
// 	const payload = {};
// 	return jwt.sign(payload, CONFIG.JWT_SECRET, {
// 		expiresIn: "16h",
// 	});
// };
