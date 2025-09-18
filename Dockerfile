# syntax=docker.io/docker/dockerfile:1

FROM node:22

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json .npmrc* ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Default command to run the application
CMD ["node", "server.js"]
