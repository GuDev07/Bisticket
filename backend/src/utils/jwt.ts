import jwt from "jsonwebtoken";

interface TokenPayLoad{
    sub: string,
    tipo: string
};

export function gerarToken(payload: TokenPayLoad, expiresIn: jwt.SignOptions["expiresIn"] = "7d"): string {
    const secretKey = process.env.JWT_SECRET!;

    return jwt.sign(payload, secretKey, {expiresIn: expiresIn})

}