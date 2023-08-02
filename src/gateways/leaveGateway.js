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
		return this._invoke("hello");
	}
}
