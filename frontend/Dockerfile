FROM node:lts-slim
# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

ENV NODE_ENV = production

RUN npm i npm@latest -g
RUN npm install

COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Copy source files
COPY . .

# Expose the port Vite serves on
EXPOSE 3030

# Start the application using Vite's preview mode
CMD ["npm", "run", "dev"]
