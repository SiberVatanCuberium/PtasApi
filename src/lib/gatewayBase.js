import * as grpc from "@grpc/grpc-js";
import * as FabricGateway from "@hyperledger/fabric-gateway";
import * as crypto from "crypto";
import { promises as fs } from "fs";
import { TextDecoder } from "util";
import { CONFIG } from "../config.js";

const certPath =
	CONFIG.FABRIC_SAMPLES_PATH +
	"/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/User1@org1.example.com-cert.pem";
const privateKeyPath =
	CONFIG.FABRIC_SAMPLES_PATH +
	"/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/priv_sk";
const tlsCertPath =
	CONFIG.FABRIC_SAMPLES_PATH +
	"/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt";

const utf8Decoder = new TextDecoder();

export class GatewayBase {
	_client = null;
	_gateway = null;
	_network = null;
	_contract = null;

	constructor(channelName, chaincodeName) {
		this._channelName = channelName;
		this._chaincodeName = chaincodeName;
	}

	async _init() {
		this._client = await newGrpcConnection();
		this._gateway = FabricGateway.connect({
			client: this._client,
			identity: await newIdentity(),
			signer: await newSigner(),
		});
		this._network = this._gateway.getNetwork(this._channelName);
		this._contract = this._network.getContract(this._chaincodeName);
	}

	close() {
		this._gateway.close();
		this._client.close();
	}

	async _evaluateTransaction(methodName, ...args) {
		console.log(`--> Invoke (evaluate): ${this._chaincodeName}.${methodName}`);

		const respBytes = await this._contract.evaluateTransaction(
			methodName,
			...args
		);
		const respJson = utf8Decoder.decode(respBytes);
		const resp = JSON.parse(respJson);

		console.log("*** Invoked successfully");

		return resp.result;
	}

	async _submitTransaction(methodName, ...args) {
		console.log(`--> Invoke (submit): ${this._chaincodeName}.${methodName}`);

		const respBytes = await this._contract.submitTransaction(
			methodName,
			...args
		);
		const respJson = utf8Decoder.decode(respBytes);
		const resp = JSON.parse(respJson);

		console.log("*** Invoked successfully");

		return resp.result;
	}
}

async function newGrpcConnection() {
	const peerEndpoint = "localhost:7051";
	const tlsRootCert = await fs.readFile(tlsCertPath);
	const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
	const peerHostAlias = "peer0.org1.example.com";
	return new grpc.Client(peerEndpoint, tlsCredentials, {
		"grpc.ssl_target_name_override": peerHostAlias,
	});
}

async function newIdentity() {
	const mspId = "Org1MSP";
	const credentials = await fs.readFile(certPath);
	return { mspId, credentials };
}

async function newSigner() {
	const privateKeyPem = await fs.readFile(privateKeyPath);
	const privateKey = crypto.createPrivateKey(privateKeyPem);
	return FabricGateway.signers.newPrivateKeySigner(privateKey);
}
