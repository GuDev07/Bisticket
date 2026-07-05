import express from 'express';
import { login, logout } from '../controllers/authController';

const router = express.Router();

router.post('/login', async (req, res) => {
    await login(req, res);
});

router.post('/logout', (req, res) => {
    logout(req, res);
});

export default router;