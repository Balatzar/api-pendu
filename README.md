## API Pendu

Le but de ce projet est de concevoir une API conçue pour implémenter des applications permettant de jouer à un Pendu simple à deux.

L'idée est de concevoir le front de cette applications avec différents framework pour les tester ou même en vanilla (javascript sans framework ou librairie), pour se rendre compte de la différence ou tout simplement s'entrainer.

Par exemple je peux concevoir tout le front avec Angular (un peu overkill mais interessant), qui se chargerait simplement de recueillir l'input des utilisateurs, faire des requêtes à l'API et refléter les résultats dans la vue. L'API se charge de créer un objet pendu, regarder si les lettres envoyée sont dans le mot choisi, gère les erreurs d'input et définit les conditions de défaite et de victoire.

### L'API en détail

L'API met en place 2 routes accessibles uniquement avec des requêtes POST.

La première, `/api/pendu`, permet de créer un objet Pendu défini comme ceci :
```	
word: String,
found: String,
miss: Number,
charSent: []
```
`word` contient la string qui devra être devinée, `found` la string avec les lettre trouvées et des '_' à la place des autres, `miss` le nombre de coups manqués et `charSent` l'ensemble des lettre ayant été envoyées par l'utilisateur (pour éviter d'envoyer plusieurs fois la même).

Cette route renvoit un code erreur 2 en cas de requête non valide (voir plus loin pour les codes d'erreur). En cas de réussite de la rêquete elle renvoit un objet contenant une string vide de la taille du mot à deviner et un id à envoyer dans les requêtes suivantes en paramètre.

La deuxième, `/api/pendu/:id`, permet d'envoyer un charactère et avoir une réponse cohérente afin de progresser dans le jeu. Elle attend un id spécifié en paramètre et un objet possédant une propriété `char` qui contient un char.

Elle renvoit un objet consitué de quatre éléments : un code alerte dans `data.code`, le mot en train d'être trouvé dans `data.found`, une url d'une image de pendu pouvant être utilisée pour montrer où en est l'utilisateur dans le jeu dans `data.image` et le nombre de fois qu'il s'est trompé dans `data.miss`.

Voila les différents code d'alerte que peut renvoyer l'API :

- 1 = "Lettre trouvée !"
- 2 = "Mauvais input"
- 3 = "Perdu"
- 4 = "Gagné"
- 5 = "Lettre déjà envoyée"
- 6 = "Lettre non trouvée"
