// pessoaRoutes.js
const express = require('express');
const Pessoa = require('../models/pessoa');
const validarCPF = require('../utils/validarCPF');

const router = express.Router();

// Rota para criar uma nova pessoa
router.post('/', async (req, res) => {
  try {
    // Verifica se o CPF é válido antes de criar a pessoa
    if (!validarCPF(req.body.cpf)) {
      return res.status(400).send({ message: 'CPF inválido.' });
    }

    const pessoa = await Pessoa.create(req.body);
    res.send(pessoa);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
;

// Rota para listar todas as pessoas
router.get('/', async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.send(pessoas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para filtrar por CPF
router.get('/cpf/:cpf', async (req, res) => {
  try {
    const pessoa = await Pessoa.findOne({ where: { cpf: req.params.cpf } });
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }
    res.send(pessoa);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para atualizar uma pessoa
router.put('/:id', async (req, res) => {
    try {
      const pessoa = await Pessoa.findByPk(req.params.id);
      if (!pessoa) {
        return res.status(404).send({ message: 'Pessoa não encontrada.' });
      }
      await pessoa.update(req.body);
      res.send(pessoa);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Rota para excluir uma pessoa
router.delete('/:id', async (req, res) => {
    try {
      const pessoa = await Pessoa.findByPk(req.params.id);
      if (!pessoa) {
        return res.status(404).send({ message: 'Pessoa não encontrada.' });
      }
      await pessoa.destroy();
      res.send({ message: 'Pessoa excluída com sucesso.' });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
module.exports = router;
