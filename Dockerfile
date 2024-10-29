# Utiliser une image officielle Node.js comme image de base
FROM node:22

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le projet dans le répertoire de travail
COPY . .

# Exposer le port 8080 pour la WebSocket et l'API 
EXPOSE 3000 8080 

# Démarrer l'application Express
CMD ["node", "index.js"]