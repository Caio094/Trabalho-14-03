// models/pessoa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Pessoa = sequelize.define('Pessoa', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING,
  dataNascimento: DataTypes.DATE,
  cpf: {
    type: DataTypes.STRING,
    unique: true
  },
  status: DataTypes.ENUM('ativo', 'inativo')
});

module.exports = Pessoa;
