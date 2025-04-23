import Fabricante from '../models/Fabricante.js';
import Medicamento from '../models/Medicamento.js';

export const listarMedicamentos = async (req, res) => {
    try {
      const medicamentos = await Medicamento.findAll({
          include: {
            model: Fabricante,
            as: 'fabricante', // Inclui o fabricante associado,
        },
      });
  
      const response = medicamentos.map((medicamento) => ({
        id: medicamento.id,
        nome_comercial: medicamento.nome_comercial, 
        principio_ativo: medicamento.principio_ativo,
        registro_anvisa: medicamento.registro_anvisa, 
        dosagem: medicamento.dosagem, 
        fabricante_id: medicamento.fabricante.id,
      }));
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao listar Medicamentos.' });
    }
};

export const criarMedicamento = async (req, res) => {

    const { nome_comercial, principio_ativo, registro_anvisa, dosagem, fabricante_id} = req.body;

    try {
    const campos_obrigatorios = { nome_comercial, principio_ativo, registro_anvisa, dosagem, fabricante_id}
    for (const [campo,valor] of Object.entries(campos_obrigatorios)){
      if (!valor){
        return res.status(400).json({ error: `O campo ${campo} é obrigatório.` });
      }
    }

    const fabricanteEncontrado = await Fabricante.findOne({where: { id: fabricante_id }});
    if (!fabricanteEncontrado){
      return res.status(400).json({ error: `Fabricante não encontrado.` });
    }
    const registroAnvisaRepetido = await Medicamento.findOne({where: { registro_anvisa: registro_anvisa}});
    if (registroAnvisaRepetido){
      return res.status(400).json({ error: `Já existe um medicamento com o mesmo registro da anvisa.` });
    } 
        
    const novoMedicamento = await Medicamento.create({
        nome_comercial, 
        principio_ativo,
        registro_anvisa, 
        dosagem, 
        fabricante_id: fabricanteEncontrado.id
        });

    res.status(201).json(novoMedicamento);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar novo Medicamento.', detalhes: error.message });
    }
};

export const obterMedicamento = async (req, res) => {
    try {

        const medicamento = await Medicamento.findByPk(req.params.id,{
          include: {
            model: Fabricante,
            as: 'fabricante'
          }
        });
        
        if (!medicamento) {
          return res.status(404).json({ error: 'medicamento não encontrada.' });
        }
    
        const response = {
          id: medicamento.id,
          nome_comercial: medicamento.nome_comercial, 
          registro_anvisa: medicamento.registro_anvisa, 
          dosagem: medicamento.dosagem, 
          fabricante_id: medicamento.fabricante.id,
          fabricante_nome: medicamento.fabricante.nome

        };

        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter medicamento.', detalhes: error.message });
      }
};


export const deletarMedicamento = async (req, res) => {
    try {
        const medicamento = await Medicamento.findByPk(req.params.id);
    
        if (!medicamento) {
            return res.status(404).json({ error: 'Medicamento não encontrada.' });
        }

        await medicamento.destroy();
        res.status(200).json("medicamento deletado");
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar medicamento.', detalhes: error.message });
    }
};