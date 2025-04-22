import Estado from '../models/Estado.js';

export const listarEstados = async (req, res) => {
    try {
      const estados = await Estado.findAll();
  
      const response = estados.map((estado) => ({
        nome: estado.nome,
        sigla: estado.sigla,
      }));
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao listar estados.' });
    }
};

export const criarEstado = async (req, res) => {
    try {
      const novoEstado = await Estado.create(req.body);

      res.status(201).json(novoEstado);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar estado.', detalhes: error.message });
    }
};

export const obterEstado = async (req, res) => {
    try {

        const estado = await Estado.findByPk(req.params.id);
    
        if (!estado) {
          return res.status(404).json({ error: 'Estado não encontrado.' });
        }
    
        const response = {
            nome: estado.nome,
            sigla: estado.sigla,
        };

        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter estado.', detalhes: error.message });
      }
};

export const alterarEstado = async (req, res) => {
    try {
        const estado = await Estado.findByPk(req.params.id);
    
        if (!estado) {
            return res.status(404).json({ error: 'Estado não encontrado.' });
        }

        const novoEstado = await Estado.update(req.body, {
          where: { id: req.params.id }
        });

        res.status(200).json("Estado atualizado",novoEstado);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao alterar estado.', detalhes: error.message });
    }
};

export const deletarEstado = async (req, res) => {
    try {
        const estado = await Estado.findByPk(req.params.id);
    
        if (!estado) {
            return res.status(404).json({ error: 'Estado não encontrado.' });
        }

        await estado.destroy();
        res.status(204).json("Estado deletado");
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar estado.', detalhes: error.message });
    }
};