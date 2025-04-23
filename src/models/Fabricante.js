// src/models/Fabricante.js
import { DataTypes, Model } from 'sequelize';
import Medicamento from './Medicamento.js';

// import { FOREIGNKEYS } from 'sequelize/lib/query-types';

class Fabricante extends Model {
  static initModel(sequelize) {
    Fabricante.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        documento_registro: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        pais: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        sequelize, // Instância do Sequelize
        modelName: 'Fabricante',
        tableName: 'fabricantes',
        timestamps: true,
      },
    );

    // declaração do relacionamento 1:N, para facilitar o get de medicamentos 
    // por fabricante
    // Fabricante.hasMany(Medicamento,{
    //   foreignKey:'fabricante_id', 
    //   as: 'medicamentos'
    // });
  }
}

export default Fabricante;