import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { json } from 'node:stream/consumers';

function obterNivel(usuario: string): number {
    if (usuario === "suporte_1") return 1;
    if (usuario === "suporte_2") return 2;
    if (usuario === "suporte_3") return 3;

    return 0;
};

export async function decidirAcao(req: Request, res: Response) {
    if(req.body.acao === "escalar") return await escalarTicket(req, res);
    if(req.body.acao === "comentar") return await comentarTicket(req, res);
    if(req.body.acao === "ver_comentarios") return await verComentariosTicket(req, res);
    if(req.body.acao === "resolver") return await resolverTicket(req, res);
    if(req.body.acao === "fechar") return await fecharTicket(req, res);
    if(req.body.acao === "abrir") return await reabrirTicket(req, res);
}

export async function criarTicket(req: Request, res: Response) {
    if(!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" })
    }

    const id = Number(req.user?.sub);
    if(isNaN(id)) return res.status(400).json({ message: "ID do usuário não fornecido" });

    const { titulo, descricao } = req.body;
    const comentario = req.body.comentario;
    if(!titulo.trim() || !descricao.trim()) return res.status(400).json({ message: "Título ou descrição não fornecido" });
    try {
        const ticket = await prisma.ticket.create({
            data: {
                titulo,
                descricao,
                usuarioId: id
            }
        })

        if (comentario) {
            await prisma.comentario.create({
                data: {
                    usuarioId: id,
                    ticketId: ticket.id,
                    texto: comentario
                }
            })
            return res.status(201).json({ticket: ticket, comentario: comentario});
        }

        return res.status(201).json(ticket);
    } catch(e) {
        return res.status(500).json({ message: "Erro ao criar ticket", erro: e })
    }
}

export async function comentarTicket(req: Request, res: Response) {
    if(!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" })
    }

    const id = Number(req.user?.sub);
    if(isNaN(id)) return res.status(400).json({ message: "ID do usuário não fornecido" });

    const ticketId = Number(req.params.id);
    if(!ticketId || isNaN(ticketId)) return res.status(400).json({ message: "ID do ticket não fornecido" });
    const { comentario } = req.body;
    if(!comentario.trim()) return res.status(400).json({ message: "Comentário não fornecido" });

    try {
        const ticketExistente = await prisma.ticket.findUnique({
            where: {
                id: ticketId
            }
        });
        if(!ticketExistente) {
            return res.status(404).json({ message: "Ticket não encontrado" })
        } else if (req.user.tipo === "cliente" && ticketExistente.usuarioId !== id) {
            return res.status(403).json({ message: "Acesso negado" })
        }

        const comentarioCriado = await prisma.comentario.create({
            data: {
                texto: comentario,
                ticketId: ticketId,
                usuarioId: id
            }
        })
        return res.status(201).json(comentarioCriado);
    } catch(e) {
        return res.status(500).json({ message: "Erro ao comentar ticket", erro: e })
    }
}

export async function verComentariosTicket(req: Request, res: Response) {
    if(!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" })
    }

    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(400).json({ message: "ID do ticket não fornecido" });

    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id
            }
        });

        if(req.user.tipo === "cliente" && ticket?.usuarioId !== Number(req.user.sub)) {
            return res.status(403).json({ message: "Acesso negado" })
        }

        const comentarios = await prisma.comentario.findMany({
            where: {
                ticketId: id
            },
            include: {
                usuario: {
                    select: {
                        nome: true,
                        tipo: true
                    }
                }
            }
        })
        return res.status(200).json(comentarios)
    } catch(e) {
        return res.status(500).json({ message: "Erro ao buscar comentários do ticket", erro: e })
    }
}

export async function listarTickets(req: Request, res: Response) {
    if(!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" })
    }

    const tipo = req.user?.tipo;
    const id = req.user?.sub;

    try{

        if (tipo === "cliente") {
           const ticket = await prisma.ticket.findMany({
            where: {
                usuarioId: Number(id)
            }
           });
           return res.status(200).json(ticket)
        }

        const nivel = obterNivel(tipo);

        const ticket = await prisma.ticket.findMany({
            where: {
                nivelSuporte: {
                    lte: nivel
                }
            }
        });

        return res.status(200).json(ticket)

    } catch(e) {
        return res.status(500).json({ message: "Erro ao listar tickets", erro: e })
    }
}

export async function escalarTicket(req: Request, res: Response) {
    if(!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" })
    } else if(req.user.tipo === "cliente") {
        return res.status(403).json({ message: "Acesso negado" })
    } else if(req.body.acao !== "escalar") {
        return res.status(400).json({ message: "Ação inválida" })
    };

    const id = Number(req.params.id);

    if(isNaN(id)) return res.status(400).json({ message: "ID do ticket não fornecido" });

    try {
        const ticketExistente = await prisma.ticket.findUnique({
            where: {
                id: id
            }
        });

        if(!ticketExistente) {
            return res.status(404).json({ message: "Ticket não encontrado" })
        } else if(ticketExistente.nivelSuporte > 2) {
            return res.status(400).json({ message: "Ticket já está no nível máximo de suporte" })
        } else if(ticketExistente.nivelSuporte !== obterNivel(req.user.tipo)) {
            return res.status(403).json({ message: "Você não tem permissão para escalar este ticket" })
        };

        const ticket = await prisma.ticket.update({
            where: {
                id: id
            },
            data: {
                nivelSuporte: {
                    increment: 1
                }
            }
        });
        return res.status(200).json({ message: "Ticket escalado para nível superior" });
    } catch(e) {
        return res.status(500).json({ message: "Erro ao escalar ticket", erro: e })
    }
}

export async function resolverTicket(req: Request, res: Response) {
    if(!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" })
    } else if (req.user?.tipo === 'cliente') {
        return res.status(403).json({ message: "Acesso negado" })
    };

    const id = Number(req.params.id);

    try {
        const ticketExistente = await prisma.ticket.findUnique({
            where: {
                id: id
            }
        });

        if (!ticketExistente) {
            return res.status(404).json({ message: "Ticket não encontrado" })
        } else if (ticketExistente.status !== "aberto") {
            return res.status(400).json({ message: "Operação inválida" })
        }

        await prisma.ticket.update({
            where: {
                id: id
            },
            data: {
                status: "em_andamento"
            }
        })

        return res.status(200).json({ message: "Ticket em_andamento" })

    } catch (e) {
        return res.status(500).json({ message: "Erro ao resolver ticket", erro: e })
    }
}

export async function fecharTicket(req: Request, res: Response) {
    if(!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" })
    } else if (req.user?.tipo === 'cliente') {
        return res.status(403).json({ message: "Acesso negado" })
    };

    const id = Number(req.params.id);

    try {
        const ticketExistente = await prisma.ticket.findUnique({
            where: {
                id: id
            }
        });

        if(!ticketExistente) {
            return res.status(404).json({ message: "Ticket não encontrado" })
        } else if (ticketExistente.status !== "em_andamento") {
            return res.status(400).json({ message: "Operação inválida" })
        }

        await responderTicket(id, req.body.resposta);

        return res.status(200).json({ message: "Ticket fechado" })
    } catch (e) {
        return res.status(500).json({ message: "Erro ao fechar ticket", erro: e })
    }
}

export async function reabrirTicket(req: Request, res: Response) {
    if(!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" })
    } else if (req.user?.tipo === 'cliente') {
        return res.status(403).json({ message: "Acesso negado" })
    }

    const id = Number(req.params.id);

    try {
        const ticketExistente = await prisma.ticket.findUnique({
            where: {
                id: id
            }
        });

        if(!ticketExistente) {
            return res.status(404).json({ message: "Ticket não encontrado" })
        } else if (ticketExistente.status !== "fechado") {
            return res.status(400).json({ message: "Operação inválida" })
        }

        await prisma.ticket.update({
            where: {
                id: id
            },
            data: {
                status: "aberto"
            }
        })

        return res.status(200).json({ message: "Ticket aberto novamente" })
    } catch (e) {
        return res.status(500).json({ message: "Erro ao reabrir ticket", erro: e })
    }
}

async function responderTicket(id: number, res: string) {
    if (!res.trim()) {
        throw new Error("Resposta inválida")
    }

    await prisma.ticket.update({
        where: {
            id: id
        },
        data: {
            resposta: res,
            status: "fechado"
        }
    });
}