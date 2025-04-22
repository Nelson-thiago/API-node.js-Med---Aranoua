import express from 'express';
import {
  listarCidades,
  criarCidade,
  obterCidade,
  alterarCidade,
  deletarCidade
  } from '../controllers/CidadeController.js';

const router = express.Router();


// Rotas para pessoas
// GET http://localhost:3000/api/pessoas
router.get('/', listarCidades); // Listar todas as pessoas
// POST http://localhost:3000/api/pessoas
router.post('/', criarCidade); // Criar pessoa
// GET http://localhost:3000/api/pessoas/id
router.get('/:id', obterCidade); // Criar pessoa
router.delete('/:id', deletarCidade);
router.put('/:id', alterarCidade);

// http://localhost:3000/pessoas
export default router;