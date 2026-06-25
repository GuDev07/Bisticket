import express from 'express';
import { listarTickets, escalarTicket } from '../controllers/ticketController';

const router = express.Router();

router.get('/', async (req, res) => {
    await listarTickets(req, res);
});

router.patch('/:id', async (req, res) => {
    await escalarTicket(req, res);
});

export default router;