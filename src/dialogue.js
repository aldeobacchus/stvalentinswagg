/*
Ce fichier contient la structure de votre histoire.
Modifiez ce fichier pour créer votre propre dialogue.

Chaque objet dans le tableau `nodes` représente une étape du dialogue.
- id: Un identifiant unique pour cette étape. Peut être un nombre ou une chaîne de caractères.
- text: Le message qui sera affiché dans la bulle de dialogue.
- image: (Optionnel) Le chemin vers une image de fond. Les images doivent être placées dans le dossier `public/assets/images/`.
- choices: (Optionnel) Un tableau de choix pour le joueur.
  - text: Le texte du bouton.
  - next: L'identifiant (`id`) de la prochaine étape du dialogue vers laquelle ce choix mène.
- isEnd: (Optionnel) Mettez à `true` si c'est une fin (succès ou échec).
- isSuccess: (Optionnel) Si `isEnd` est `true`, indique si c'est une fin heureuse (`true`) ou non (`false`).
*/

export const dialogue = {
  startNodeId: 1, // Le dialogue commence avec le noeud qui a l'id 1
  nodes: [
    {
      id: 1,
      text: "Dis, ça te dirait d'être mon Valentin pour la Saint-Valentin ?",
      image: "/assets/images/start.png", // A remplacer par votre image
      choices: [
        {
          text: "Oui, avec grand plaisir !",
          next: 2,
        },
        {
          text: "Non, désolé(e).",
          next: "end_failure",
        },
      ],
    },
    {
      id: 2,
      text: "Super ! Pour fêter ça, que préfères-tu ?",
      image: "/assets/images/happy.png", // A remplacer par votre image
      choices: [
        {
          text: "Un dîner romantique.",
          next: "end_success",
        },
        {
          text: "Une soirée film à la maison.",
          next: "end_success",
        },
      ],
    },
    {
      id: "end_success",
      text: "Parfait ! Alors rendez-vous le 14 février. Voici ton invitation !",
      image: "/assets/images/invitation.png", // L'invitation finale
      isEnd: true,
      isSuccess: true,
    },
    {
      id: "end_failure",
      text: "Oh... d'accord. C'est la fin du jeu pour toi !",
      image: "/assets/images/sad.png", // A remplacer par votre image
      isEnd: true,
      isSuccess: false,
    },
  ],
};
