FROM node:lts-slim
WORKDIR /usr/app

COPY package*.json ./

# Set environment variable
ENV NODE_ENV = production

RUN ls -l 

RUN npm i npm@latest -g
RUN npm i

COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

COPY . . 

EXPOSE 3000

CMD ["node", "app.js"]
