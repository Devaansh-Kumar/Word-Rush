FROM node:latest as base
WORKDIR /client
COPY package.json package-lock.json /client/
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]
