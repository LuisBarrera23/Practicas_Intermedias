# Version node
FROM node:latest

#Creacion del directorio de trabajo
WORKDIR /app

#Copiando archivos con las librerias necesarias
COPY package.json ./
COPY package-lock.json ./

#Comando para instalar dependencias
RUN npm install

#Copiar las dependencias y archivos
COPY . .

#Puerto a exponer
EXPOSE 8080

CMD ["npm", "start"]