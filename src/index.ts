import WebSocket from "ws";
import { WebSocketClient } from "./WebSocketClient/index";
import { HttpClient } from "./HttpClient/index";

export type Auth = {
	readonly application: string;
	readonly secretKey: string;
};

export class ThunLights {
	public readonly request: HttpClient;
	public readonly ws: WebSocketClient;

	constructor(public readonly auth: Auth) {
		this.request = new HttpClient(auth.application, auth.secretKey);
		this.ws = new WebSocketClient(new WebSocket("wss://oauth.thunlights.com/ws"), auth);
	}
}

export { OauthError } from "./HttpClient/HttpClient.error";
