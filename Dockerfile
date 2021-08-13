FROM node:v12.16.1

WORKDIR /robot_assignement

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "test" ]
