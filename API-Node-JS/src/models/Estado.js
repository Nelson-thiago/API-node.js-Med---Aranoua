// src/models/Estado.js
import { DataTypes, Model } from 'sequelize';

class Estado extends Model {
  static initModel(sequelize) {
    Estado.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        sigla: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [2, 2], // Apenas siglas com 2 caracteres
          },
        },
      },
      {
        sequelize, // Instância do Sequelize
        modelName: 'Estado',
        tableName: 'estados',
        timestamps: true,
      }
    );
  }
}

export default Estado;