import express from 'express';
import { decidirAcao, listarTickets, criarTicket } from '../controllers/ticketController';

const router = express.Router();

router.get('/', async (req, res) => {
    await listarTickets(req, res);
});

router.patch('/:id', async (req, res) => {
    await decidirAcao(req, res);
});

router.post('/', async (req, res) => {
    await criarTicket(req, res);
});

export default router;