import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags: [
      { name: "Products", description: "API operations related to products" },
    ],
    info: {
      title: "ProductsAdmin REST API",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const url =
  "https://miro.medium.com/v2/resize:fit:1400/1*f7ztMaMM0etsFHpEfkdiwA.png";
const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url('${url}');
    }
    .swagger-ui .topbar {
      background-color: white;
      box-shadow: 0px -4px 8px black;
    }
  `,
  customSiteTitle: "Documentación ProductsAdmin REST API",
};

export default swaggerSpec;
export { swaggerUiOptions };
