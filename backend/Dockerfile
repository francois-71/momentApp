FROM node:20.9.0

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

RUN npm install -g pm2

RUN npm i sequelize 
RUN npm i bcrypt

RUN npm install --save-dev @types/express @types/sequelize

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm", "--", "start"]
