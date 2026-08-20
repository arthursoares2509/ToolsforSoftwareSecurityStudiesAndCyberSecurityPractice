FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Set user
USER root

RUN npm install
# If you are building your code for production
# RUN npm ci --omit-dev

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["node", "server.js"]