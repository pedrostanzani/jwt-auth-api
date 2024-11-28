import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";

import { Scraper } from "@/services";
import { prisma } from "@/lib/prisma";
import config from "@/lib/config";

const scraper = new Scraper();

export const routes = new Elysia()
  .use(bearer())
  .use(
    jwt({
      name: "jwt",
      secret: config.JWT_SECRET,
      exp: "1h",
    })
  )
  .onError(({ code, error }) => {
    if (code === "VALIDATION") {
      return new Response(
        JSON.stringify({
          error: "Unprocessable Entity",
        }),
        {
          status: error.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  })
  .post(
    "/registrar",
    async ({ jwt, body, error }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (user) {
        return error(409, {
          error: "Conflict",
        });
      }

      const hash = await Bun.password.hash(body.senha);
      const newUser = await prisma.user.create({
        data: {
          name: body.nome,
          email: body.email,
          password: hash,
        },
      });

      const token = await jwt.sign({
        name: newUser.name,
        email: newUser.email,
      });

      return new Response(JSON.stringify({ jwt: token }), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      body: t.Object({
        nome: t.String(),
        email: t.String({
          format: "email",
        }),
        senha: t.String({
          minLength: 8,
        }),
      }),
      type: "application/json",
      response: {
        201: t.Object(
          {
            jwt: t.String({
              examples: [
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
              ],
            }),
          },
          {
            description: "Created",
          }
        ),
        409: t.Object(
          {
            error: t.String({
              examples: ["Conflict"],
            }),
          },
          {
            description: "Conflict",
          }
        ),
        422: t.Object(
          {
            error: t.String({
              examples: ["Unprocessable Entity"],
            }),
          },
          {
            description: "Unprocessable Entity",
          }
        ),
      },
      detail: {
        summary: "Registrar usuário",
      },
    }
  )
  .post(
    "/login",
    async ({ error, body, jwt }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!user) {
        return error(401, {
          error: "Unauthorized",
        });
      }

      const isMatch = await Bun.password.verify(body.senha, user.password);
      if (!isMatch) {
        return error(401, {
          error: "Unauthorized",
        });
      }

      const token = await jwt.sign({
        name: user.name,
        email: user.email,
      });

      return { jwt: token };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        senha: t.String(),
      }),
      type: "application/json",
      response: {
        200: t.Object(
          {
            jwt: t.String({
              examples: [
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
              ],
            }),
          },
          {
            description: "OK",
          }
        ),
        401: t.Object(
          {
            error: t.String({
              examples: ["Unauthorized"],
            }),
          },
          {
            description: "Unauthorized",
          }
        ),
        422: t.Object(
          {
            error: t.String({
              examples: ["Unprocessable Entity"],
            }),
          },
          {
            description: "Unprocessable Entity",
          }
        ),
      },
      detail: {
        summary: "Fazer login",
      },
    }
  )
  .get(
    "/consulta",
    async ({ bearer, jwt, error }) => {
      const payload = await jwt.verify(bearer);
      if (!payload) {
        return error(401, {
          error: "Unauthorized",
        });
      }

      const data = await scraper.fetchData();

      return {
        success: true,
        response: data,
      };
    },
    {
      type: "application/json",
      response: {
        200: t.Object(
          {
            success: t.Boolean(),
            response: t.Object({
              scrapedAt: t.String({
                format: "date-time",
              }),
              headlines: t.Array(t.String()),
            }),
          },
          {
            description: "OK",
          }
        ),
        401: t.Object(
          {
            error: t.String({
              examples: ["Unauthorized"],
            }),
          },
          {
            description: "Unauthorized",
          }
        ),
      },
      detail: {
        summary: "Consultar dados",
        description:
          "Esse endpoint retorna uma lista de manchetes da BBC. Essas manchetes são armazenadas em cache e atualizam de hora em hora.",
        security: [{ "Bearer Token": [] }],
      },
    }
  )
  .get("/consultar", ({ redirect }) => {
    return redirect("/consulta");
  }, {
    detail: {
      hide: true,
    },
  });
