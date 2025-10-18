FROM oven/bun

WORKDIR /app

# Install system dependencies for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Install dependencies first to cache the layer
COPY package.json bun.lockb ./
RUN bun install

# Copy the rest of the app files
COPY prisma prisma
COPY public public
COPY src src
COPY tsconfig.json .

# Run Prisma schema generation
RUN bunx prisma generate

# Remove dev dependencies and install only production dependencies
RUN bun install --production

ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start:migrate:prod"]
