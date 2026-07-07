import { Response, Request } from 'express'
import { TokenPayLoad } from '../utils/jwt';

interface clienteSSE {
    userId: number,
    tipo: string,
    res: Response
}

const clientes: clienteSSE[] = [];

export function criarCliente(payload: any, res: Response) {
    clientes.push({
        userId: Number(payload.sub),
        tipo: payload.tipo,
        res
    })
}

export function deletarCliente(payload: any) {
    const cliente = clientes.findIndex(c => {c.userId == payload.sub});
    console.log("Deletado:\n" + clientes[cliente])
    clientes.splice(cliente, 1);
};

export function emitirEvento(evento: string, ticket: any) {
    for (const cliente of clientes) {
        if(cliente.tipo === 'cliente') {
            if(cliente.userId !== ticket.usuarioId) {
                continue;
            }
        } else {
            const nivelSuporte = cliente.tipo.split("_")[1];

            if(nivelSuporte < ticket.nivelSuporte) {
                continue;
            }
        }

        cliente.res.write(`event: ${evento}\ndata: ${JSON.stringify(ticket)}\n\n`)
    }
}