import Fabricante from '../models/Fabricante.js';
import Medicamento from '../models/Medicamento.js';

export const listarFabricantes = async (req, res) => {
    try {
      const fabricantes = await Fabricante.findAll();
  
      const response = fabricantes.map((fabricante) => ({
        id: fabricante.id,
        nome: fabricante.nome, 
        documento_registro: fabricante.documento_registro,
        pais: fabricante.pais
      }));
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao listar Fabricantes.' });
    }
};

export const criarFabricante = async (req, res) => {
    try {
      const {nome, documento_registro, pais} = req.body;
      // verificações
      const campos_obrigatorios = {nome, documento_registro, pais}
      for (const [campo,valor] of Object.entries(campos_obrigatorios)){
        if (!valor){
          return res.status(400).json({ error: `O campo ${campo} é obrigatório.` });
        }
      }

      const nomeEncontrado = await Fabricante.findOne({where: { nome: nome }});
      const docRegistroEncontrado = await Fabricante.findOne({where: { documento_registro: documento_registro }});
      if (nomeEncontrado || docRegistroEncontrado) {
        let camposDuplicados = [];
        if (nomeEncontrado) camposDuplicados.push('nome');
        if (docRegistroEncontrado) camposDuplicados.push('documento de registro');
        return res.status(400).json({
          error: `Já existe um fabricante com o(s) campo(s) duplicado(s): ${camposDuplicados.join(' e ')}.`,
        });
      }

      const novoFabricante = await Fabricante.create({
        nome, 
        documento_registro, 
        pais
        });
      res.status(201).json(novoFabricante);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar Fabricante.', detalhes: error.message });
    }
};

export const obterFabricante = async (req, res) => {
    try {

        const fabricante = await Fabricante.findByPk(req.params.id);
        if (!fabricante) {
          return res.status(404).json({ error: 'fabricante não encontrado.' });
        }

        const medicamentos = await Medicamento.findAll({
          where: {fabricante_id: req.params.id}
        });

        const response = {
          id: fabricante.id, 
          nome: fabricante.nome, 
          documento_registro: fabricante.documento_registro, 
          pais: fabricante.pais,
          medicamentos: medicamentos
        };

        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter Fabricante.', detalhes: error.message });
      }
};

export const deletarFabricante = async (req, res) => {
    try {
        const fabricante = await Fabricante.findByPk(req.params.id);
        if (!fabricante) {
            return res.status(404).json({ error: 'Fabricante não encontrado.' });
        }
        
        const medicamentos = await Medicamento.findAll({
          where: {fabricante_id: req.params.id}
        });
        if (medicamentos.length===0){
          await fabricante.destroy();
          res.status(200).json("Fabricante deletad com sucesso");
        }else{
          return res.status(404).json({ error: `Não é possivel deletar o fabricante '${fabricante.nome}', pois ainda existem produtos associados a ele.` });
        }
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar Fabricante.', detalhes: error.message });
    }
};