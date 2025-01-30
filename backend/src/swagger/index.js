const userSwagger = require("./user.swagger");

module.exports = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation for the Express.js application",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./swagger/*.swagger.js"], // Path to all Swagger files
};
