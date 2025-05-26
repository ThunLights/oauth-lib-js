# ThunLights Open Authorization Lib

This package is intended for easy use of ThunLights Open Authorization.

This package will be updated as needed as the API is updated.

<strong>All of these examples are written in typescript.</strong>

## Usage

```ts
import { ThunLights, OauthError } from "@thunlights/oauth";

const thunlights = new ThunLights({
	application: "APLICATION_ID",
	secretKey: "SECRET_KEY"
});

//code to access token and refresh token.
const response = await thunlights.request.code.verify("CODE_HERE");
if (!(response instanceof OauthError)) {
	//access token to account data
	const accountData = await thunlights.request.accessToken.verify(response.accessToken);

	if (!(accountData instanceof OauthError)) {
		console.log(accountData);

		//refresh token to new access token
		await thunlights.request.refreshToken.verify(accountData.id, response.refreshToken);
	}
}
```

## Usage for WebSocket

<strong>It is recommended to use websocket for periodic updates of access tokens, etc.</strong>

```ts
import { ThunLights, OauthError } from "@thunlights/oauth";

const thunlights = new ThunLights.WebSocket({
	application: "APLICATION_ID",
	secretKey: "SECRET_KEY"
});

thunlights.on("open", (applicationId) => {
	console.log(`LOGINED: ${applicationId}`);

	//code to access token and refresh token.
	thunlights.verify.code("CODE_HERE");
});

thunlights.on("error", (content) => {
	console.log(content);
});

thunlights.on("code", (content) => {
	console.log(content);

	//access token to account data
	thunlights.verify.accessToken(content.accessToken);

	//refresh token to new access token
	thunlights.verify.refreshToken(content.refreshToken);
});

thunlights.on("accessToken", (content) => {
	console.log(content);
});

thunlights.on("refreshToken", (content) => {
	console.log(content);
});
```

## Other Language

https://document.thunlights.com/docs/category/use-libraries
