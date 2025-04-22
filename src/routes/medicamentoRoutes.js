import express from 'express';
import {
  listarMedicamentos,
  criarMedicamento,
  obterMedicamento,
  deletarMedicamento
  } from '../controllers/medicamentoController.js';

const router = express.Router();


// Rotas para pessoas
// GET http://localhost:3000/api/pessoas
router.get('/', listarMedicamentos); // Listar todas as pessoas
// POST http://localhost:3000/api/pessoas
router.post('/', criarMedicamento); // Criar pessoa
// GET http://localhost:3000/api/pessoas/id
router.get('/:id', obterMedicamento); 
router.delete('/:id', deletarMedicamento);

// http://localhost:3000/pessoas
export default router;