import express from 'express';
import medicamentoRoutes from './routes/medicamentoRoutes.js';
import fabricantesRoutes from './routes/fabricanteRoutes.js';
import sequelize from './config/database.js';

const app = express();

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/fabricantes', fabricantesRoutes);

// Inicializar banco de dados
// Sincronizar banco de dados sem recriar tabelas existentes
sequelize
  .sync() // Altera as tabelas existentes sem excluir dados
  .then(() => console.log('Banco de dados sincronizado com sucesso.'))
  .catch((error) => console.error('Erro ao sincronizar banco de dados:', error));

export default app;