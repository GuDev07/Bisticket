import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

router.post('/login', async (req, res) => {
    await login(req, res);
});

export default router;