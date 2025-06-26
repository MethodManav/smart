FROM node:18-alpine

# Set working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source files
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port (change if your app runs on another port)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
