FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]


#for using docker with frontend change the port to 8080 in the env of both frontend and backend ,and in the frontend add the ipv4 of the address instead of localhost