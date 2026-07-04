import express from 'express';
import { decidirAcao, listarTickets, criarTicket } from '../controllers/ticketController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { verificarToken } from '../utils/jwt';
import { criarCliente } from '../events/ticketEvents';
import { JwtPayload } from 'jsonwebtoken';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    await listarTickets(req, res);
});

router.patch('/:id', authMiddleware, async (req, res) => {
    await decidirAcao(req, res);
});

router.post('/create', authMiddleware, async (req, res) => {
    await criarTicket(req, res);
});

router.get('/stream', async (req, res) => {
    res.header("Content-Type", "text/event-stream");
    res.header("Connection", "keep-alive");
    res.header("X-Accel-Buffering", "no");
    res.header("Cache-Control", "no-cache");

    const token: any = req.query.token;
    const payload = verificarToken(token);
    criarCliente(payload, res)

})

export default router;