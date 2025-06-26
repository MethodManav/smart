# Step 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build it
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Step 2: Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy only the compiled code and node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 5000
CMD ["node", "dist/app.js"]
