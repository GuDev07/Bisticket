import { Request, Response } from "express";
import argon2 from "argon2";
import { prisma } from "../config/prisma";

export async function listarUsuarios(req: Request, res: Response) {
    try {
        const usuarios = await prisma.user.findMany();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export async function criarUsuario(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    try {
        const hash = await argon2.hash(senha);
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