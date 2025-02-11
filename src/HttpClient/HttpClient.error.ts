
export type Details = {
    status: number
}

export class OauthError {
    constructor(public readonly content: string, public readonly details?: Details) {}
}
