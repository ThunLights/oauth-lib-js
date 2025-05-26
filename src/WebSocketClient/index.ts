import WebSocket from "ws";
import { EventEmitter } from "events";
import { WebSocketClientMessage } from "./WebScocketClient.message";

import { CodeApiResponse } from "../HttpClient/HttpClient.code";
import { AccessTokenApiResponse } from "../HttpClient/HttpClient.accessToken";
import { RefreshTokenApiResponse } from "../HttpClient/HttpClient.refreshToken";

import type StrictEventEmitter from "strict-event-emitter-types";
import type { Auth } from "../index";

const Event = EventEmitter as {
	new (): StrictEventEmitter<
		EventEmitter,
		{
			error: (content: string) => void;
			welcome: (content: string) => void;
			open: (content: string) => void;
			code: (content: CodeApiResponse) => void;
			accessToken: (content: AccessTokenApiResponse) => void;
			refreshToken: (content: RefreshTokenApiResponse) => void;
		}
	>;
};

export class WebSocketClient extends Event {
	public loaded = false;
	public readonly ws: WebSocket;

	constructor(public readonly auth: Auth) {
		super();

		this.ws = new WebSocket("wss://oauth.thunlights.com/ws");

		this.ws.on("open", async () => {
			this.ws.on("message", (message, isBinary) => {
				const data = WebSocketClientMessage.parse(message, isBinary);
				if (!data) {
					return;
				}
				if (data.type === "heartbeat") {
					return this.ws.send(
						JSON.stringify({
							type: "heartbeat",
							content: Date.now()
						})
					);
				}

				this.emit(data.type, JSON.parse(message.toString()).content);
			});
			this.ws.send(
				JSON.stringify({
					type: "handshake",
					applicationId: auth.application,
					secret: auth.secretKey
				})
			);
			this.loaded = true;
		});
	}

	public get verify() {
		return {
			code: (code: string) => {
				if (this.loaded) {
					return this.ws.send(
						JSON.stringify({
							type: "code",
							content: code
						})
					);
				}
			},
			accessToken: (accessToken: string) => {
				if (this.loaded) {
					return this.ws.send(
						JSON.stringify({
							type: "accessToken",
							content: accessToken
						})
					);
				}
			},
			refreshToken: (refreshToken: string) => {
				if (this.loaded) {
					return this.ws.send(
						JSON.stringify({
							type: "refreshToken",
							content: refreshToken
						})
					);
				}
			}
		};
	}
}
