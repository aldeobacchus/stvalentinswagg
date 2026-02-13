<script setup>
import { ref, computed } from "vue";
import { dialogue } from "../dialogue.js";

// Référence réactive pour suivre l'ID du nœud de dialogue actuel
const currentNodeId = ref(dialogue.startNodeId);

// Calcule le nœud de dialogue actuel en fonction de l'ID
const currentNode = computed(() => {
  return dialogue.nodes.find((node) => node.id === currentNodeId.value);
});

// Gère la sélection d'un choix
function selectChoice(nextNodeId) {
  currentNodeId.value = nextNodeId;
}

// Recharge la page pour recommencer
function restartGame() {
  window.location.reload();
}

// Calcule l'URL de l'image de fond
const backgroundStyle = computed(() => {
  const gradient = 'linear-gradient(to bottom right, #ff7e5f, #feb47b, #ff0066, #990033)';
  if (currentNode.value?.backgroundImage) {
    // Si une image de fond est spécifiée, la mettre par-dessus le dégradé
    return { backgroundImage: `url(${currentNode.value.backgroundImage}), ${gradient}` };
  }
  // Sinon, utiliser uniquement le dégradé
  return { backgroundImage: gradient };
});

// Images des personnages
const characterLeftImage = computed(() => currentNode.value?.characterLeftImage);
const characterRightImage = computed(() => currentNode.value?.characterRightImage);

// Image de fin
const endImage = computed(() => currentNode.value?.endImage);
</script>

<template>
  <div class="game-container" :style="backgroundStyle">
    <!-- Écran de fin -->
    <div v-if="currentNode.isEnd" class="end-screen">
      <img v-if="endImage" :src="endImage" alt="Image de fin" class="end-image" />
      <p class="end-text">{{ currentNode.question }}</p>
      <button v-if="!currentNode.isSuccess" @click="restartGame" class="choice-button restart-button">
        Reload
      </button>
    </div>

    <!-- Contenu du jeu (non affiché si c'est une fin) -->
    <template v-else>
      <div class="bubble-wrapper question-wrapper">
        <img src="/assets/images/bubble_question.png" alt="Bulle de question" class="bubble-image" />
        <p class="bubble-text question-text">{{ currentNode.question }}</p>
      </div>

      <img v-if="characterLeftImage" :src="characterLeftImage" alt="Personnage gauche" class="character-image left" />
      <img v-if="characterRightImage" :src="characterRightImage" alt="Personnage droit" class="character-image right" />

      <div class="bubble-wrapper choices-wrapper">
        <img src="/assets/images/bubble_choices.png" alt="Bulle de choix" class="bubble-image" />
        <div class="choices-container">
          <button
            v-for="choice in currentNode.choices"
            :key="choice.text"
            @click="selectChoice(choice.next)"
            class="choice-button"
          >
            {{ choice.text }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Styles pour le conteneur principal du jeu */
.game-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Aligne les bulles en bas par défaut (desktop) */
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* Styles pour les images des personnages (desktop par défaut) */
.character-image {
  position: absolute;
  bottom: 0;
  height: 70%; /* Ajustez la taille selon vos images */
  object-fit: contain;
  z-index: 1;
}

.character-image.left {
  left: 0;
}

.character-image.right {
  right: 0;
}

/* Styles pour les wrappers de bulles (image + texte/boutons) */
.bubble-wrapper {
  position: relative;
  width: 100%;
  max-width: 800px; /* Limite la largeur des bulles sur desktop */
  margin-bottom: 15px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bubble-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.bubble-text, .choices-container {
  position: absolute;
  width: 80%;
  text-align: center;
  color: #333;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  padding: 10px;
  box-sizing: border-box;
}

.question-text {
  font-size: 1.3rem;
}

/* Conteneur pour les boutons de choix */
.choices-container {
  display: flex;
  flex-direction: row; /* Par défaut en ligne */
  flex-wrap: wrap; /* Permet le retour à la ligne si pas assez de place */
  gap: 10px;
  justify-content: center; /* Centre les boutons */
}

/* Styles pour les boutons */
.choice-button {
  background-color: #ff0066; /* Rose/rouge de Saint-Valentin */
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 18px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  flex-grow: 0; /* Ne prend pas toute la largeur disponible */
  white-space: nowrap; /* Empêche le texte de se couper */
}

.choice-button:hover {
  background-color: #e91e63; /* Teinte plus foncée au survol */
  transform: translateY(-2px);
}

/* Styles pour l'écran de fin */
.end-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  z-index: 20;
}

.end-image {
  max-width: 90%;
  max-height: 80%;
  object-fit: contain;
  margin-bottom: 20px;
}

.end-text {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 1.3rem;
  color: #333;
}

.restart-button {
  margin-top: 20px;
}

/* Styles pour les écrans mobiles */
@media (max-width: 767px) {
  .game-container {
    justify-content: flex-start; /* Aligne les éléments en haut */
    padding-top: 10px; /* Réduit le padding top */
    padding-bottom: 10px; /* Réduit le padding bottom */
  }

  /* Les images de personnages ne sont plus absolues sur mobile */
  .character-image {
    position: static; /* Rejoint le flux normal */
    height: auto; /* La hauteur sera gérée par le flexbox */
    width: 100%; /* Prend toute la largeur disponible */
    max-width: 150px; /* Limite la taille des personnages encore plus */
    max-height: 30vh; /* Nouvelle limite de hauteur relative au viewport */
    object-fit: contain;
    margin-bottom: 10px; /* Réduit la marge */
  }

  /* Ordre des éléments sur mobile */
  .question-wrapper {
    order: 1;
  }
  .character-image.left {
    order: 2;
  }
  .choices-wrapper {
    order: 3;
  }
  .character-image.right {
    order: 4;
  }

  .question-text {
    font-size: 1.1rem;
  }
  .choice-button {
    font-size: 1rem;
    padding: 10px 15px;
  }
  .end-text {
    font-size: 1.1rem;
  }
}

/* Styles pour les écrans desktop */
@media (min-width: 768px) {
  .question-text {
    font-size: 1.5rem;
  }
  .choice-button {
    font-size: 1.2rem;
  }
  .choices-container {
    flex-direction: row;
    justify-content: center;
  }
  .character-image {
    height: 85%;
  }
}
</style>
