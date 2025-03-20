const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de E-commerce",
      version: "1.0.0",
      description: "Documentação da API de E-commerce",
      contact: {
        name: "Letícia",
        email: "leticia@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID do produto",
            },
            title: {
              type: "string",
              description: "Nome do produto",
            },
            description: {
              type: "string",
              description: "Descrição do produto",
            },
            price: {
              type: "number",
              description: "Preço do produto",
            },
            thumbnail: {
              type: "string",
              description: "URL da imagem do produto",
            },
            code: {
              type: "string",
              description: "Código do produto",
            },
            stock: {
              type: "number",
              description: "Quantidade em estoque",
            },
          },
        },
        Cart: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID do carrinho",
            },
            products: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Product",
              },
              description: "Lista de produtos no carrinho",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
