# Construisez une API sécurisée pour une application d'avis gastronomiques
So Pekocko

## Lancement
 - Dossier backend

    Ouvrez un terminal et positionnez vous sur le dossier backend à partir du dossier du projet
```
> cd backend
> Executer la commande npm install
> Executer npm install -g nodemon (utiliser sudo si vous êtes sur un système unix)
> Lancer le backend avec nodemon server
```

- Dossier frontend

    Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.
    
    
    
    Ouvrez un terminal et positionnez vous sur le dossier frontend à partir du dossier du projet
```
> cd frontend
> Executer la commande npm install
> Lancer le frontend avec npm start ou ng serve
> Rendez-vous sur http://localhost:4200/
```
    
- Si la commande npm start ou ng serve n'aboutit pas correctement, installer node-sass à part.

## Utilisation
- L'API ne sera fonctionnelle qu'après quelques modifications. Vous pouvez télécharger ou cloner le projet.
- Dans le dossier backend, vous trouverez un fichier .env.txt, que vous devrez renommer en .env

```
// Base de données Mongo
DB_USER=<db user>
DB_PASS=<db password>
DB_URL=<db url>
DB_NAME=<db name>

// Token
TOKEN=<token>
```
- Créer une base de données Mongo et remplacer les éléments entre <> par vos informations. Remplacer `<token>` par un token de votre choix.

```
Exemple de modifications correctes
// Base de données Mongo
DB_USER=user
DB_PASS=monmotdepasse
DB_URL=masuperbd.mlkss.mongodb.net
DB_NAME=masuperbd

// Token
TOKEN=MON_TOKEN_SECRET
```

- Vous pouvez profiter de l'API