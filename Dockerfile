# Usa la imagen oficial de Node.js como base
FROM node:22.11.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Exponer los puertos que tu aplicación usará
EXPOSE 9091 4000

# Comando para iniciar tu aplicación (ajustar si tu archivo principal es diferente)
CMD ["node", "index"]
