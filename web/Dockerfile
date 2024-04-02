# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /usr/src/web

# Install Python and make, required by node-gyp
RUN apk add --no-cache python3 make g++

# Install bash, might be needed for some scripts
RUN apk add --no-cache bash

# Ensure Python3 is available as 'python' too, if it doesn't already exist
RUN if [ ! -e /usr/bin/python ]; then ln -s /usr/bin/python3 /usr/bin/python; fi

# Copying package files
COPY package*.json ./

# Installing npm dependencies
RUN npm install

# Installing Vue CLI globally
RUN npm install -g @vue/cli

# Copying the rest of the application code
COPY . .

# build stage
FROM develop-stage as build-stage
CMD ["npm", "run", "build"]

# production stage
# TODO
