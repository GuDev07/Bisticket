import express from 'express';
import { decidirAcao, listarTickets, criarTicket } from '../controllers/ticketController';
import { authMiddleware } from '../middlewares/authMiddleware';

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

export default router;