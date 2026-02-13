/*
Ce fichier contient la structure de votre histoire.
Modifiez ce fichier pour créer votre propre dialogue.

Chaque objet dans le tableau `nodes` représente une étape du dialogue.
- id: Un identifiant unique pour cette étape. Peut être un nombre ou une chaîne de caractères.
- question: Le message qui sera affiché dans la bulle de dialogue de la question.
- characterLeftImage: (Optionnel) Le chemin vers l'image du personnage de gauche.
- characterRightImage: (Optionnel) Le chemin vers l'image du personnage de droite.
- backgroundImage: (Optionnel) Le chemin vers une image de fond pour la scène.
  Les images doivent être placées dans le dossier `public/assets/images/`.
- choices: (Optionnel) Un tableau de choix pour le joueur.
  - text: Le texte du bouton.
  - next: L'identifiant (`id`) de la prochaine étape du dialogue vers laquelle ce choix mène.
- isEnd: (Optionnel) Mettez à `true` si c'est une fin (succès ou échec).
- isSuccess: (Optionnel) Si `isEnd` est `true`, indique si c'est une fin heureuse (`true`) ou non (`false`).
- endImage: (Optionnel, uniquement si `isEnd` est `true`) Le chemin vers l'image finale (invitation ou game over).
*/

export const dialogue = {
  startNodeId: 1, // Le dialogue commence avec le noeud qui a l'id 1
  nodes: [
    {
      id: 1,
      question: "Dis, ça te dirait d'être mon Valentin pour la Saint-Valentin ?",
      characterLeftImage: "/assets/images/gab1.png", // Exemple
      characterRightImage: "/assets/images/nina1.png", // Exemple
      backgroundImage: "/assets/images/background_park.png", // Exemple
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
      question: "Super ! Pour fêter ça, que préfères-tu ?",
      characterLeftImage: "/assets/images/char_left_happy.png", // Exemple
      characterRightImage: "/assets/images/char_right_happy.png", // Exemple
      backgroundImage: "/assets/images/background_cafe.png", // Exemple
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
      question: "Parfait ! Alors rendez-vous le 14 février. Voici ton invitation !",
      isEnd: true,
      isSuccess: true,
      endImage: "/assets/images/invitation.png", // L'invitation finale
    },
    {
      id: "end_failure",
      question: "Oh... d'accord. C'est la fin du jeu pour toi !",
      isEnd: true,
      isSuccess: false,
      endImage: "/assets/images/game_over.png", // Image de game over
    },
  ],
};