// src/config/database.js
import { Sequelize } from 'sequelize';
import Pessoa from '../models/Pessoa.js';
import Cidade from '../models/Cidade.js';
import Estado from '../models/Estado.js';

// Configuração do Sequelize (SQLite como exemplo)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

// Inicializar os modelos
Estado.initModel(sequelize);
Cidade.initModel(sequelize);
Pessoa.initModel(sequelize);

export default sequelize;