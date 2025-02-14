# ThunLights Open Authorization Lib

This package is intended for easy use of ThunLights Open Authorization.

This package will be updated as needed as the API is updated.

<strong>All of these examples are written in typescript.</strong>

## Usage

```ts
import { ThunLights, OauthError } from "@thunlights/oauth";

const thunlights = new ThunLights({
    application: "APLICATION_ID",
    secretKey: "SECRET_KEY",
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

const thunlights = new ThunLights({
    application: "APLICATION_ID",
    secretKey: "SECRET_KEY",
});

thunlights.ws.on("open", domain => {
    console.log(`LOGINED: ${domain}`);

    //code to access token and refresh token.
    thunlights.ws.verify.code("CODE_HERE");
});

thunlights.ws.on("error", content => {
    console.log(content);
});

thunlights.ws.on("code", content => {
    console.log(content);

    //access token to account data
    thunlights.ws.verify.accessToken(content.accessToken);

    //refresh token to new access token
    thunlights.ws.verify.refreshToken(content.refreshToken);
});

thunlights.ws.on("accessToken", content => {
    console.log(content);
});

thunlights.ws.on("refreshToken", content => {
    console.log(content);
});
```

## Documentation

https://document.thunlights.com/docs/intro
