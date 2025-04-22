// src/models/Fabricante.js
import { DataTypes, Model } from 'sequelize';
import { FOREIGNKEYS } from 'sequelize/lib/query-types';

class Fabricante extends Model {
  static initModel(sequelize) {
    Fabricante.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        registro: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [11, 11], // 11 caracteres
          }
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
    Fabricante.hasMany(Medicamento,{
      foreignkey:'fabricante_id', 
      as: 'medicamentos'
    });
  }
}

export default Fabricante;