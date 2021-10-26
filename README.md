# SylvainYvonneau_7_11102021

Projet concernant la création d'un réseau de communication interne à une entreprise.

Cloner ce répertoire puis naviguer dans les répertoires de la manière suivante :

## Partie Back-end ##

- Se déplacer dans le sous-répertoire back-end
- Créer un fichier .env sur la base du fichier .env.model
- Si besoin, modifier les fichiers back-end/config/config.json et back-end/config/db.config.js pour correspondre aux informations de connexion de votre base de données mySQL locale.
- Lancer la commande `npm install`
- Lancer la commande `nodemon server` pour lancer le back-end sur le port 3001
Dans une autre fenêtre de commande :
- Lancer la commande `npx sequelize-cli db:create grouporama`
- Lancer la commande `npx sequelize-cli db:migrate`

## Partie Front-end ##

Dans une autre fenêtre de commande :
- Se déplacer dans le sous-répertoire front-end
- Lancer la commande `npm install`
- Lancer la commande `npm start` pour lancer le back-end sur le port 3001

