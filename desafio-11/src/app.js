const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { createServer } = require("http");
const { Server } = require("socket.io");
const exphbs = require("express-handlebars");
const path = require("path");
const connectDB = require("./config/db");
const swaggerConfig = require("./config/swagger"); // Importe o Swagger
require("./config/passport");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Conecta ao MongoDB
connectDB();

// Configuração do Handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuração do Swagger
swaggerConfig(app); // Adicione esta linha

// Middleware para verificar autenticação
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

// Rotas de autenticação
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Rotas de produtos
const productRoutes = require("./routes/product.routes");
app.use("/products", ensureAuthenticated, productRoutes);

// Rotas de carrinho
const cartRoutes = require("./routes/cart.routes");
app.use("/carts", ensureAuthenticated, cartRoutes);

// Rotas de views
const viewsRoutes = require("./routes/views.routes");
app.use("/", viewsRoutes);

// WebSocket
io.on("connection", (socket) => {
  console.log("Novo cliente conectado");

  // Envia a lista de produtos ao cliente quando ele se conecta
  socket.on("requestProducts", async () => {
    const products = await productService.getProducts();
    socket.emit("updateProducts", products);
  });

  // Recebe um novo produto do cliente e o adiciona
  socket.on("addProduct", async (product) => {
    await productService.addProduct(product);
    const products = await productService.getProducts();
    io.emit("updateProducts", products); // Atualiza todos os clientes
  });

  // Recebe um ID de produto para deletar
  socket.on("deleteProduct", async (id) => {
    await productService.deleteProduct(id);
    const products = await productService.getProducts();
    io.emit("updateProducts", products); // Atualiza todos os clientes
  });

  // Recebe uma nova mensagem do chat
  socket.on("sendMessage", async (data) => {
    await messageService.addMessage(data.user, data.message);
    const messages = await messageService.getMessages();
    io.emit("updateMessages", messages); // Atualiza todos os clientes
  });
});

// Inicia o servidor
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
