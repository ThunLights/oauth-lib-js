import { WebSocketClient } from "./WebSocketClient/index";
import { HttpClient } from "./HttpClient/index";

export type Auth = {
	readonly application: string;
	readonly secretKey: string;
};

export class ThunLights {
	public static readonly WebSocket = WebSocketClient;
	public readonly request: HttpClient;

	constructor(public readonly auth: Auth) {
		this.request = new HttpClient(auth.application, auth.secretKey);
	}
}

export { OauthError } from "./HttpClient/HttpClient.error";
