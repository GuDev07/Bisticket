declare namespace Express {
    export interface Request {
        user?: {
            sub: string,
            tipo: string,
            iat?: number,
            exp?: number
        }
    }
}