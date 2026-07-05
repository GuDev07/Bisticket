import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    sub: string;
    tipo: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    };

    try {
        const credenciais = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = credenciais
        next()
    } catch(e) {
        return res.status(401).json({ messagee: "Token inválido" })
    }
}