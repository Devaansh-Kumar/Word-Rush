FROM node:latest as base
WORKDIR /server
COPY . /server/
COPY package.json package-lock.json /server/
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "devStart"]
