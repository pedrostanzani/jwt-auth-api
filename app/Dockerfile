FROM oven/bun

WORKDIR /app

# Install dependencies first to cache the layer
COPY package.json bun.lockb ./
RUN bun install --production

# Copy the rest of the app files
COPY prisma prisma
COPY public public
COPY src src
COPY tsconfig.json .

# Run Prisma schema generation
RUN bunx prisma generate

ENV NODE_ENV production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start:migrate:prod"]
