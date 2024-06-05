FROM node:lts-alpine 

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

ENV NODE_ENV = production

# RUN npm i http-server -g
RUN npm install -g npm@10.5.2
RUN npm install

COPY --chown=node:node package.json package-lock.json* ./

# Copy source files
COPY . .

# Expose the port Vite serves on
EXPOSE 3030

# Start the application using Vite's preview mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3030"]
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3030"]
