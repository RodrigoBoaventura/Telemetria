const WebSocket = require('ws');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const server = app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});

const wss = new WebSocket.Server({ server });

function gerarTelemetria() {
  return {
    velocidade: Math.floor(Math.random() * 40) + 5, // km/h
    rpm: Math.floor(Math.random() * 1500) + 1000,
    combustivel: Math.floor(Math.random() * 100),
    produtividade: Math.floor(Math.random() * 100),
    timestamp: new Date()
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