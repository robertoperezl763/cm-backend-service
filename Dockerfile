FROM node:20-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 30120
CMD [ "node", "dist./index.js"]