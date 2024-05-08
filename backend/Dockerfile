FROM node:lts-alpine 
WORKDIR /usr/app

COPY package*.json ./

# Set environment variable
ENV NODE_ENV = production

# Check if files are copied correctly
RUN ls -l 

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["node", "app.js"]

