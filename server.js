const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

const PORT = process.env.PORT || 3000;

// criar servidor HTTP manualmente
const server = http.createServer(app);

// criar servidor websocket ligado ao HTTP
const wss = new WebSocket.Server({ server });

// rota simples só pra testar
app.get("/", (req, res) => {
  res.send("Servidor WebSocket funcionando");
});

function gerarTelemetria() {
  return {
    velocidade: Math.floor(Math.random() * 40) + 5,
    rpm: Math.floor(Math.random() * 1500) + 1000,
    combustivel: Math.floor(Math.random() * 100),
    produtividade: Math.floor(Math.random() * 100),
    timestamp: new Date()
  };
}

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  const interval = setInterval(() => {
    ws.send(JSON.stringify(gerarTelemetria()));
  }, 2000);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Cliente desconectado");
  });
});

// iniciar servidor
server.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});