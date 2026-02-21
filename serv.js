const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

// necessário para Railway reconhecer que o servidor está online
app.get("/", (req, res) => {
  res.send("Servidor WebSocket online");
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});

function gerarTelemetria() {
  return {
    velocidade: Math.floor(Math.random() * 40) + 5,
    rpm: Math.floor(Math.random() * 1500) + 1000,
    combustivel: Math.floor(Math.random() * 100),
    produtividade: Math.floor(Math.random() * 100),
  };
}

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  setInterval(() => {
    ws.send(JSON.stringify(gerarTelemetria()));
  }, 2000);
});