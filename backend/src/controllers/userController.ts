import { Request, Response } from "express";
import argon2 from "argon2";
import { prisma } from "../config/prisma";

export async function listarUsuarios(req: Request, res: Response) {
    try {
        const usuario = await prisma.user.findUnique({
            where: {
                id: Number(req.user?.sub)
            },
            select: {
                nome: true,
                email: true,
                tipo: true
            }
        });
        return res.json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export async function criarUsuario(req: Request, res: Response) {
    const tipo = req.user?.tipo;
    const { nome, email, senha } = req.body;

    try {
        if (tipo === "administrador") {
            const tipoInformado = req.body.tipo;
            const hash = await argon2.hash(senha, {
                type: argon2.argon2id,
                memoryCost: 65536,
                timeCost: 3,
                parallelism: 4
            });
            const usuario = await prisma.user.create({
                data: {
                    tipo: tipoInformado,
                    nome,
                    email,
                    senha: hash
                }
            })
            return res.status(201).json(usuario);
        }
        
        const hash = await argon2.hash(senha, {
            type: argon2.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 4
        });
        const usuario = await prisma.user.create({
            data: {
                nome,
                email,
                senha: hash
            }
        })
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user' });
    }
}