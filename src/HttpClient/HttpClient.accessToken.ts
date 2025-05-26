import { HttpClientBase } from "./HttpClient.base";
import { OauthError } from "./HttpClient.error";

export type AccessTokenApiResponse = {
	id: number;
	txtId: string;
	email: string;
	displayName: string;
};

export class AccessToken extends HttpClientBase {
	public async verify(accessToken: string): Promise<AccessTokenApiResponse | OauthError> {
		try {
			const response = await fetch(
				`https://oauth.thunlights.com/check/accessToken/${accessToken}`,
				{
					method: "POST"
				}
			);
			if (response.status === 200) {
				return await response.json();
			}
			if (response.status === 400) {
				const { content } = await response.json();
				return new OauthError(content, { status: 400 });
			}

			return new OauthError("ERR");
		} catch {
			return new OauthError("ERR");
		}
	}
}
