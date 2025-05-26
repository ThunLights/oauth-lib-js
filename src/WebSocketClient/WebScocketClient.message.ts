import { z } from "zod";

import type WebSocket from "ws";

export class WebSocketClientMessage {
	private static MessageTypes = z.union([
		z.object({
			type: z.literal("heartbeat"),
			content: z.number()
		}),
		z.object({
			type: z.literal("error"),
			content: z.string()
		}),
		z.object({
			type: z.literal("welcome"),
			content: z.string()
		}),
		z.object({
			type: z.literal("open"),
			content: z.string()
		}),
		z.object({
			type: z.literal("code"),
			content: z.object({
				accessToken: z.string(),
				refreshToken: z.string()
			})
		}),
		z.object({
			type: z.literal("accessToken"),
			content: z.object({
				id: z.number(),
				txtId: z.string(),
				email: z.string(),
				displayName: z.string()
			})
		}),
		z.object({
			type: z.literal("refreshToken"),
			content: z.object({
				accessToken: z.string()
			})
		})
	]);

	public static parse(
		message: WebSocket.RawData,
		isBinary: boolean
	): z.infer<typeof this.MessageTypes> | null {
		try {
			if (!isBinary) {
				const data = this.MessageTypes.parse(JSON.parse(message.toString()));
				return data;
			} else {
				return null;
			}
		} catch {
			return null;
		}
	}
}
