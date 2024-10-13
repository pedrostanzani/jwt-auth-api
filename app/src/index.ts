import { Elysia, t } from "elysia";
import { swagger, ElysiaSwaggerConfig } from "@elysiajs/swagger";
import { routes } from "@/routes";

const swaggerOptions: ElysiaSwaggerConfig<string> | undefined = {
  // path: "/docs",
  documentation: {
    info: {
      title: "JWT Authentication API",
      description:
        "Documentação da API de autenticação com JWT desenvolvida para o projeto da disciplina de Computação em Nuvem.",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        "Bearer Token": {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
};

const app = new Elysia().use(swagger(swaggerOptions)).use(routes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
