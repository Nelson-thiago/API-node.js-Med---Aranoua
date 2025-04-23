import express from 'express';
import {
  listarFabricantes,
  criarFabricante,
  obterFabricante,
  deletarFabricante
  } from '../controllers/fabricanteController.js';

const router = express.Router();


// Rotas para pessoas
// GET http://localhost:3000/api/pessoas
router.get('/', listarFabricantes); // Listar todas as pessoas
// POST http://localhost:3000/api/pessoas
router.post('/', criarFabricante); // Criar pessoa
// GET http://localhost:3000/api/pessoas/id
router.get('/:id', obterFabricante); // Criar pessoa
router.delete('/:id', deletarFabricante);

// http://localhost:3000/pessoas
export default router;