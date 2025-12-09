import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

// WebSockets
const io = new Server(server);

// 🔥 Nueva función exportable SIN romper dependencias
export const emitUpdate = (event, data) => {
  io.emit(event, data);
};

io.on("connection", (socket) => {
  console.log("Cliente conectado");
});
