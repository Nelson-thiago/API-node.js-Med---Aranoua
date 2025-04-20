import Estado from '../models/Estado.js';
import Cidade from '../models/Cidade.js';

export const listarCidades = async (req, res) => {
    try {
      const cidades = await Cidade.findAll({
          include: {
            model: Estado,
            as: 'estado', // Inclui o estado associado,
        },
      });
  
      const response = cidades.map((cidade) => ({
        ibge: cidade.ibge,
        nome: cidade.nome,
        estado: cidade.estado.nome
      }));
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao listar cidades.' });
    }
};

export const criarCidade = async (req, res) => {

    const { ibge, nome, estado } = req.body;

    try {

    if (!estado) {
        return res.status(400).json({ error: 'Estado é obrigatório.' });
    }

    const estadoEncontrado = await Estado.findOne({
        where: { nome: estado }
    });
        
    const novaCidade = await Cidade.create({
        ibge,
        nome,
        estado_id: estadoEncontrado.id
      });

    res.status(201).json(novaCidade);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar cidade.', detalhes: error.message });
    }
};

export const obterCidade = async (req, res) => {
    try {

        const cidade = await Cidade.findByPk(req.params.id,{
          include: {
            model: Estado,
            as: 'estado'
        }
        });
    
        if (!cidade) {
          return res.status(404).json({ error: 'Cidade não encontrada.' });
        }
    
        const response = {
            ibge: cidade.ibge,
            nome: cidade.nome,
            estado: cidade.estado.nome
        };

        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter cidade.', detalhes: error.message });
      }
};

export const alterarCidade = async (req, res) => {
  const { ibge, nome, estado } = req.body;

  try {
      if (!estado) {
          return res.status(400).json({ error: 'Estado é obrigatório.' });
      }

      
      const estadoEncontrado = await Estado.findOne({
          where: { nome: estado }
      });

      if (!estadoEncontrado) {
          return res.status(400).json({ error: 'Estado não encontrado.' });
      }

      
      const cidadeAtualizada = await Cidade.update({
          ibge: ibge,
          nome: nome,
          estado_id: estadoEncontrado.id
      }, {
          where: { id: req.params.id }
      });


      res.status(200).json({
          message: 'Cidade atualizada com sucesso!',
          cidadeAtualizada
      });
  } catch (error) {
      res.status(400).json({ 
          error: 'Erro ao alterar cidade.', 
          detalhes: error.message 
      });
  }
};

export const deletarCidade = async (req, res) => {
    try {
        const cidade = await Cidade.findByPk(req.params.id);
    
        if (!cidade) {
            return res.status(404).json({ error: 'Cidade não encontrada.' });
        }

        await cidade.destroy();
        res.status(204).json("Cidade deletada");
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar cidade.', detalhes: error.message });
    }
};