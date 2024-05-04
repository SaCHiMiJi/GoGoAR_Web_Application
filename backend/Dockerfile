FROM node:lts-alpine 
WORKDIR /usr/app

COPY package*.json ./

# Set environment variable
ENV NODE_ENV = production

# Check if files are copied correctly
RUN ls -l 

RUN npm install

COPY . . 
# CMD ["node", "app.js"]
# RUN npm run build
# CMD ["npm", "run", "prod"]

CMD [ "npm", "start" ]
# CMD [ "npm", "run", "build"]
