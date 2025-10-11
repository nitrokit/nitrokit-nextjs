# Stage 1: Builder - Install dependencies and build the application
FROM node:20-alpine AS builder

# Set the application's working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install only dependencies (to leverage Docker layer caching)
RUN pnpm fetch
RUN pnpm install --prod=false --ignore-scripts

# Copy application source code
COPY . .

# Install bash and grant execute permission to the script
RUN apk add --no-cache bash && \
    chmod +x ./scripts/generate-i18n-declaration.sh

# Build the application
RUN pnpm build

# Stage 2: Runner - Create a small image with only the necessary files for production
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the necessary files from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Install production dependencies
RUN pnpm install --prod

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start"]