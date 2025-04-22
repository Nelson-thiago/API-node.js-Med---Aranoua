// src/config/database.js
import { Sequelize } from 'sequelize';
import Fabricante from '../models/Fabricante.js';
import Medicamento from '../models/Medicamento.js';

// Configuração do Sequelize (SQLite como exemplo)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

// Inicializar os modelos
Fabricante.initModel(sequelize);
Medicamento.initModel(sequelize);

export default sequelize;