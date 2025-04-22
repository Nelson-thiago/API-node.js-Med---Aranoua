// src/testes/TestaInserirRegistros.js
import sequelize from './src/config/database.js';
import Medicamento from './src/models/Medicamento.js';
import Fabricante from './src/models/Fabricante.js';

(async () => {
  try {
    // Sincronizar o banco de dados
    // Recriar as tabelas no novo banco de dados
    await sequelize.sync({ force: true }); // Recria tabelas do zero
    console.log('Novo banco de dados criado!');

    await Fabricante.create({ nome: 'Vita Max', documento_registro: '12345678900', pais:"Brasil" });
    await Fabricante.create({ nome: 'Healty', documento_registro: '40028922098', pais:"Estados Unidos" });

    console.log('Fabricantes criados!');

    await Medicamento.create({ nome_comercial: 'nimesulinda', principio_ativo: "nimesulida", registro_anvisa: '3550308', dosagem: "30mg", fabricante_id: 1}); // ID vita max
    await Medicamento.create({ nome_comercial: 'metforminha', principio_ativo: "metformina", registro_anvisa: '0849484', dosagem: "100mg", fabricante_id: 2}); // ID healty

    console.log('Medicamentos criadas!');

  } catch (error) {
    console.error('Erro ao inserir registros:', error.message);
  }
})();


