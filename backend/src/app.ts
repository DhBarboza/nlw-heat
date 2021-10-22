import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { router } from "./routes";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

// Para ele identificar requisições do tipo json
app.use(express.json());

app.use(router);

// Criar rota de login com o github:
app.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

// Definir uma rota para callback:
app.get("/signin/callback", (request, response) => {
  // Desestruturação para obter code da chamada:
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };
