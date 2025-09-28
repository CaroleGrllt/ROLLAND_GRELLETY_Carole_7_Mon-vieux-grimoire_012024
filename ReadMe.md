# MON VIEUX GRIMOIRE

## Description
Développement d'une application de publication et de notation de livres.<br/>Création d'un serveur avec Express et connexion à une base de données MongoDB.<br/>Implémentation d'un système de connexion sécurisé pour les utilisateurs du site.
## Prérequis
Avant de commencer, vous devez avoir installé sur votre machine :<br/>

Node.js<br/>
NPM

## Installation
Suivez les étapes suivantes pour installer le projet localement :<br/>

1. Clôner le dépôt du projet<br/>
`git clone https://github.com/CaroleGrllt/ROLLAND_GRELLETY_Carole_7_Mon-vieux-grimoire_012024.git`<br/>

2. Aller dans le dossier où le projet est cloné<br/>
`cd nom-de-votre-dossier`<br/>

3. Installer les dépendances du projet dans le dossier "backend"<br/>
Créez un cluster sur la base de données MongoDB<br/>
Configurez un fichier .env pour vous connecter à votre base de données : <br/>
```
TOKEN_SECRET=
MONGODB_CO=
```
`npm install`<br/>

4. Installer les dépendances du projet dans le dossier "frontend"<br/>
`npm install`

## Lancement de l'application
Pour lancer l'application en mode développement, exécutez les commandes suivantes :<br/>
D'abord dans le dossier backend : `npm dev`
Puis dans le dossier frontend : `npm start`
<br/><br/>
Vous pouvez vous créer un compte utilisateur pour tester le projet

### WARNING : 
Le back-end est géré par render.com, en version gratuite. Le service se met en veille après 15 mins d'inactivité. Chaque redémarrage du service demande quelques secondes (et jusqu'à 1 min). Si les données ne s'affichent pas immédiatement, patientez quelques secondes puis rafraîchissez la page.