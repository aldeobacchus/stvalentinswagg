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
  if (currentNode.value?.image) {
    return { backgroundImage: `url(${currentNode.value.image})` };
  }
  return {};
});
</script>

<template>
  <div class="game-container" :style="backgroundStyle">
    <div class="dialogue-box">
      <p class="dialogue-text">{{ currentNode.text }}</p>

      <div class="choices-container" v-if="!currentNode.isEnd">
        <button
          v-for="choice in currentNode.choices"
          :key="choice.text"
          @click="selectChoice(choice.next)"
          class="choice-button"
        >
          {{ choice.text }}
        </button>
      </div>

      <div class="end-container" v-else>
        <button v-if="!currentNode.isSuccess" @click="restartGame" class="choice-button">
          Recommencer
        </button>
        <!-- Pour la fin réussie, l'invitation est affichée, pas besoin de bouton -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles pour le conteneur principal du jeu */
.game-container {
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Aligne la bulle en bas */
  height: 100vh;
  width: 100vw;
  padding: 20px;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
  box-sizing: border-box;
}

/* Styles pour la bulle de dialogue */
.dialogue-box {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 25px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  border: 3px solid #333;
}

/* Petite flèche pour imiter une bulle de BD */
.dialogue-box::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 20px 20px 0;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

/* Styles pour le texte du dialogue */
.dialogue-text {
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  color: #333;
  font-family: 'Comic Sans MS', cursive, sans-serif; /* Police un peu fun */
}

/* Conteneur pour les boutons de choix */
.choices-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Styles pour les boutons */
.choice-button {
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.choice-button:hover {
  background-color: #a29bfe;
  transform: translateY(-2px);
}

/* Styles pour les écrans mobiles */
@media (min-width: 768px) {
  .choices-container {
    flex-direction: row;
    justify-content: center;
  }
  .dialogue-text {
    font-size: 1.8rem;
  }
  .choice-button {
    font-size: 1.4rem;
  }
}
</style>
