// src/models/Pessoa.js
import { DataTypes, Model } from 'sequelize';
import Cidade from './Cidade.js'; // Importa o modelo Cidade

class Pessoa extends Model {
  static initModel(sequelize) {
    Pessoa.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
      },
      {
        sequelize, // Recebe a instância do Sequelize
        modelName: 'Pessoa',
        tableName: 'pessoas',
        timestamps: true,
      }
    );

    // Associação com Cidade
    Pessoa.belongsTo(Cidade, {
      foreignKey: 'cidade_id',
      as: 'cidade',
    });
  }
}

export default Pessoa;