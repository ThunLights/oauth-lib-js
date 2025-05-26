export abstract class HttpClientBase {
	constructor(
		protected readonly applicationId: string,
		protected readonly secretKey: string
	) {}
}
