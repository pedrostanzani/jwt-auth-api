FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY prisma prisma
COPY src src
COPY tsconfig.json .
COPY public public

RUN bunx prisma generate

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000