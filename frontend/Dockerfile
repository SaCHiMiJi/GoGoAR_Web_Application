FROM node:lts-alpine

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 50364

# start app
CMD ["npm", "run", "dev"]