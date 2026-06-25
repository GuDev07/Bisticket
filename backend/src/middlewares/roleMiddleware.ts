import { Request, Response, NextFunction } from 'express';

export async function redirecionarUsuario(req: Request, res: Response, next: NextFunction) {
    const tipo = req.user?.tipo;

    if (tipo === 'cliente') {
        return res.status(403).json({ error: 'Acesso negado' });
    }

}