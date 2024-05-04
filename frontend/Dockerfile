# Use a Node.js base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Expose the port Vite serves on
EXPOSE 3030

# Start the application using Vite's preview mode
CMD ["npm", "run", "preview"]
