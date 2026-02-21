const WebSocket = require('ws');
const express = require('express');

const app = express();

// ESSENCIAL para Railway
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor online');
});

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const wss = new WebSocket.Server({ server });

function gerarTelemetria() {
  return {
    velocidade: Math.floor(Math.random() * 40) + 5,
    rpm: Math.floor(Math.random() * 1500) + 1000,
    combustivel: Math.floor(Math.random() * 100),
    produtividade: Math.floor(Math.random() * 100)
  };
}

setInterval(() => {
  const dados = JSON.stringify(gerarTelemetria());

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(dados);
    }
  });

}, 2000);