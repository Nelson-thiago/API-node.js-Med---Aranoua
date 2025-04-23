import express from 'express';
import {
  listarMedicamentos,
  criarMedicamento,
  obterMedicamento,
  deletarMedicamento
  } from '../controllers/medicamentoController.js';

const router = express.Router();


// Rotas para pessoas
// GET http://localhost:3000/api/medicamentos
router.get('/', listarMedicamentos); // Listar todas os medicamentos
// POST http://localhost:3000/api/medicamentos
router.post('/', criarMedicamento); // Criar medicamentos
// GET http://localhost:3000/api/medicamentos/id
router.get('/:id', obterMedicamento); 
// DELETE  http://localhost:3000/api/medicamentos/id
router.delete('/:id', deletarMedicamento);

// http://localhost:3000/pessoas
export default router;