// src/models/Cidade.js
import { DataTypes, Model } from 'sequelize';
import Fabricante from './Fabricante.js'; // Importa o modelo Estado

class Medicamento extends Model {
  static initModel(sequelize) {
    Cidade.init(
      {
        ibge: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        estado_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Estado, // Associação com Estado
            key: 'id',
          },
        },
      },
      {
        sequelize, // Instância do Sequelize
        modelName: 'Cidade',
        tableName: 'cidades',
        timestamps: true,
      }
    );

    // Associação com Estado
    Cidade.belongsTo(Estado, {
      foreignKey: 'estado_id',
      as: 'estado',
    });
  }
}

export default Cidade;