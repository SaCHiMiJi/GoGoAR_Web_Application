FROM node:lts-alpine

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# start app
CMD ["npm", "run", "dev"]