## API Pendu

Le but de ce projet est de concevoir une API conçue pour implémenter des applications permettant de jouer à un Pendu simple à deux.

L'idée est de concevoir le front de cette applications avec différents framework pour les tester ou même en vanilla (javascript sans framework ou librairie), pour se rendre compte de la différence ou tout simplement s'entrainer.

Par exemple je peux concevoir tout le front avec Angular (un peu overkill mais interessant), qui se chargerait simplement de recueillir l'input des utilisateurs, faire des requêtes à l'API et refléter les résultats dans la vue. L'API se charge de créer un objet pendu, regarder si les lettres envoyée sont dans le mot choisi, gère les erreurs d'input et définit les conditions de défaite et de victoire.

### L'API en détail

L'API met en place 2 routes accessibles uniquement avec des requêtes POST.

La première, /api/pendu, permet de créer un objet pendu défini comme ceci :
```	word: String,
	found: String,
	miss: Number,
	charSent: []
	```


- 1 = "Lettre trouvée !"
- 2 = "Mauvais input"
- 3 = "Perdu"
- 4 = "Gagné"
- 5 = "Lettre déjà envoyée"
- 6 = "Lettre non trouvée"