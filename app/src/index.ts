import { Elysia, t } from "elysia";
import { swagger, ElysiaSwaggerConfig } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";

import { routes } from "@/routes";

const swaggerOptions: ElysiaSwaggerConfig<string> | undefined = {
  path: "/swagger",
  documentation: {
    info: {
      title: "JWT Authentication API",
      description:
        "JWT Authentication API documentation developed for the \"Cloud Computing\" class project. For more detailed documentation (including details about deploying to AWS), visit <a href='/docs' target='_blank'>/docs</a>.",
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

const app = new Elysia()
  .use(swagger(swaggerOptions))
  .use(routes)
  .use(
    staticPlugin({
      prefix: "/",
    })
  )
  .get("/", ({ redirect }) => redirect("/swagger"), {
    detail: {
      hide: true,
    },
  })
  .get("/docs", (c) => Bun.file("public/index.html"), {
    detail: {
      hide: true,
    },
  })
  .get("/docs/endpoints", (c) => Bun.file("public/endpoints.html"), {
    detail: {
      hide: true,
    },
  })
  .get("/docs/getting-started", (c) => Bun.file("public/getting-started.html"), {
    detail: {
      hide: true,
    },
  })
  .get("/docs/deploy", (c) => Bun.file("public/deploy.html"), {
    detail: {
      hide: true,
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
