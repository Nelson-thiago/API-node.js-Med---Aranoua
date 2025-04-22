// src/testes/TestaInserirRegistros.js
import sequelize from './src/config/database.js';
import Medicamento from './models/Medicamento.js';
import Fabricante from './models/Fabricante.js';

(async () => {
  try {
    // Sincronizar o banco de dados
    // Recriar as tabelas no novo banco de dados
    await sequelize.sync({ force: true }); // Recria tabelas do zero
    console.log('Novo banco de dados criado!');

    await Estado.create({ nome: 'São Paulo', sigla: 'SP' });
    await Estado.create({ nome: 'Rio de Janeiro', sigla: 'RJ' });
    await Estado.create({ nome: 'Amazonas', sigla: 'AM' });

    console.log('Estados criados!');

    await Cidade.create({ nome: 'São Paulo', ibge: '3550308', estado_id: 1 }); // ID do estado SP
    await Cidade.create({ nome: 'Rio de Janeiro', ibge: '3304557', estado_id: 2 }); // ID do estado RJ
    await Cidade.create({ nome: 'Manaus', ibge: '1302607', estado_id: 3 }); // ID do estado AM

    console.log('Cidades criadas!');

    await Pessoa.create({ nome: 'João Silva', telefone: '123456789', email: 'joao@example.com', cidade_id: 1 });

    console.log('Pessoas criadas!');

  } catch (error) {
    console.error('Erro ao inserir registros:', error.message);
  }
})();


