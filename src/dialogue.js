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
      question: "cc ça va ^^ ?",
      characterLeftImage: "/assets/images/gab1.png",
      characterRightImage: "/assets/images/nina1.png",
      backgroundImage: "/assets/images/background_park.png",
      choices: [
        {
          text: " oui oui !!!",
          next: 2,
        },
        {
          text: "euh non...",
          next: 3,
        },
      ],
    },
    {
      id: 2,
      question: "tfk demain ? Tu sais le 14 Fevrier de la st valentin",
      characterLeftImage: "/assets/images/gab2.png",
      characterRightImage: "/assets/images/nina1.png",
      backgroundImage: "/assets/images/background_cafe.png", // Exemple
      choices: [
        {
          text: "je suis pas dispo dsl...",
          next: "end_failure",
        },
        {
          text: "rien, pour l'instant ?...",
          next: 4,
        },
      ],
    },
    {
      id: 3,
      question: "J'ai quelque chose pour te remonter le moral...",
      characterLeftImage: "/assets/images/gab1.png",
      characterRightImage: "/assets/images/nina1.png",
      backgroundImage: "/assets/images/background_cafe.png", // Exemple
      choices: [
        {
          text: "Ok dit moi",
          next: 2,
        }
      ],
    },
    {
      id: 4,
      question: "Je t'invite.... au restaurant !!! Accepte tu ?",
      characterLeftImage: "/assets/images/gab3.png",
      characterRightImage: "/assets/images/nina1.png",
      backgroundImage: "/assets/images/background_cafe.png", // Exemple
      choices: [
        {
          text: "ah non desole",
          next: "end_failure",
        },
        {
          text: "oui !!!!!",
          next: "end_success",
        },
      ],
    },
    {
      id: "end_success",
      question: "",
      isEnd: true,
      isSuccess: true,
      endImage: "/assets/images/win.png", // L'invitation finale
    },
    {
      id: "end_failure",
      question: "ah....... tant pis ^^",
      isEnd: true,
      isSuccess: false,
      endImage: "/assets/images/fail.png", // Image de game over
    },
  ],
};