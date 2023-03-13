const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API BackEnd e-Commerce - Garcia Rapisarda",
      version: "1.0.0",
      description: "Una API para el proyecto final de CoderHouse",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor Local",
      },
    ],
  },
  apis: [`${path.join(__dirname, "../doc/getProducts.yaml")}`],
};



const specs = swaggerJsdoc(options);

module.exports = specs;