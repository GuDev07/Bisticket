import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import argon2 from "argon2";
import { gerarToken } from "../utils/jwt";

export async function login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
        const usuario = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        const senhaValida = await argon2.verify(usuario.senha, senha);

        if (!senhaValida) {
            return res.status(401).json({ message: "Senha inválida" })
        }

        const token = gerarToken({
            sub: usuario.id.toString(),
            tipo: usuario.tipo
        })

        if (usuario.tipo === "administrador") {
            return res.status(200).json({ token: token, pagina: "ejf_capivara_admin" })    
        }

        return res.status(200).json({ token: token, pagina: "tickets" })
    } catch(e) {
        return res.status(500).json({ message: "Erro no servidor", erro: e })
    }
}