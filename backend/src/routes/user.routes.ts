import express from 'express';
import { listarUsuarios, criarUsuario } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/me', authMiddleware, (req, res) => {
  listarUsuarios(req, res)
});

router.post('/', (req, res) => {
  criarUsuario(req, res);
});

export default router;