// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pessoaRoutes = require('./routes/pessoaRoutes');
const connection = require('./database/connection');

const app = express();

// Configuração do bodyParser para analisar solicitações JSON
app.use(bodyParser.json());

connection.sync()

// Rotas
app.use('/pessoas', pessoaRoutes);

// Inicia o servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
