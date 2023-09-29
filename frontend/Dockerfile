FROM node:alpine

WORKDIR /frontend

COPY package*.json .
#COPY package-lock.json .    el "*" de la linea arriba incluye todo lo que se llama igual 

#RUN npm ci --only=production    para hacerlo mas liviano
RUN npm install 

COPY . .

RUN npm run build 

EXPOSE 3000

CMD ["npm", "start"]


