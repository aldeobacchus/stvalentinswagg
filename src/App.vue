<script setup>
import Home from './Home.vue';
</script>

<template>
  <Home />
</template>

<style>
/* Styles globaux pour s'assurer que l'application prend tout l'écran sans marges */
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* Empêche le défilement de la page */
}
</style>