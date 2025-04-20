import express from 'express';
import {
  listarEstados,
  criarEstado,
  obterEstado,
  alterarEstado,
  deletarEstado
  } from '../controllers/EstadoController.js';

const router = express.Router();


// Rotas para pessoas
// GET http://localhost:3000/api/pessoas
router.get('/', listarEstados); // Listar todas as pessoas
// POST http://localhost:3000/api/pessoas
router.post('/', criarEstado); // Criar pessoa
// GET http://localhost:3000/api/pessoas/id
router.get('/:id', obterEstado); // Criar pessoa
router.delete('/:id', deletarEstado);
router.put('/:id', alterarEstado);

// http://localhost:3000/pessoas
export default router;