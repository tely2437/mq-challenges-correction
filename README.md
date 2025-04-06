# MqChallenges
## Mise en place
### Prérequis
- node 
- npm

### Commandes
```bash
> npm install
```
Installer les dépandences du projet.

```bash
> npm run start:api
```
Démarrer l'API NestJS sur le port 3000.

```bash
> npm run start:site
```
Démarrer le front sur le port 4200.

```bash
> npm run test:api
```
Lancer les tests E2E de l'API.

## Codebase
Cette codebase est basée sur la stack technique principale de Qualineo.

Pour rendre la chose plus lisible, la codebase a été simplifiée et réduite à une seule fonctionnalité : une application de gestion de tâches. On s'est aussi concentré sur les technologies pré-dominantes dans cette stack: NestJS pour créer une Rest API, et React pour une application front.

### Front
Ici, le framework principal est React.
On dispose uniquement d'un contexte permettant de passer de mode jour à mode nuit, d'un layout, et de 3 pages.

### Back
Le framework principal est NestJS.

Pour la base de données, on utilise le package `typeorm`, avec une base de données `SQLite`, permettant de rendre l'exécution du challenge possible sans installations supplémentaires. Quelques données sont déjà fournies.


## Challenges
- [Instructions du challenge back-end](./back.md)
- [Instructions du challenge front-end](./front.md)


### Raisonnement et Etapes 


## Refacto de la codebase pour mettre a l'avant le systeme modulaire de nestJs

- Reorganisantion des fichier pour faire les systeme de module de NestJs (fait)
- Creation de .env.example pour facilité la prise en main (fait)
- suppression de app.controller ... qui ne sert pas a grand chose (fait)
- Ajout de swagger pour une documentation de l'api (fait)

- Ajout de Dto pour optimiser le swagger et eviter les OMIT et PARTIAL sur l'entité (A faire)
- Ajouter des tests pour le service et le controller (A faire)
- ajout de cette expression dans la conf de typeOrm entities: [__dirname + '/**/*.entity{.ts,.js}'] pour eviter d'importer toute les entité manuellement (A faire)
- Mise en place de Docker (A faire)


## wrapper le retour de la liste de tâches dans un objet pour inclure le compte total de tâches, pour aider à la pagination (Fait)




## Gestion des permissions sur les taches

- Si a la creation isEdit est a true on peut modifier la tache sinon on a une exeption
- Si a la creation isDelete est a true on peut supprimer la tache sinon on a une exeption
- Si a la creation isRead est a true on peut lire la tache sinon on a une exeption


## Gestion des operations en masses

- Creation en masse (fait)
- Edit en masses (Fait)
- Delete en masse (Fait)

