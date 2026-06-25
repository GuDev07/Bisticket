import express from 'express';
import { listarUsuarios, criarUsuario } from '../controllers/userController';

const router = express.Router();

router.get('/', listarUsuarios);

router.post('/', (req, res) => {
  criarUsuario(req, res);
});

export default router;