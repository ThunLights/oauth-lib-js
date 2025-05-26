import { Code } from "./HttpClient.code";
import { AccessToken } from "./HttpClient.accessToken";
import { RefreshToken } from "./HttpClient.refreshToken";

export class HttpClient {
	public readonly code: Code;
	public readonly accessToken: AccessToken;
	public readonly refreshToken: RefreshToken;

	constructor(applicationId: string, secretKey: string) {
		this.code = new Code(applicationId, secretKey);
		this.accessToken = new AccessToken(applicationId, secretKey);
		this.refreshToken = new RefreshToken(applicationId, secretKey);
	}
}
