<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1>Take the quiz<br />and try your first pair!</h1>
    <RouterLink to="/quiz" class="button primary">Try On Trial</RouterLink>
    <p class="footnote">30 Days risk free</p>
    <img
      id="background-image"
      src="@/assets/background.png"
      alt="Enthusiastic sports man ready to run"
      draggable="false"
    />
  </main>
</template>

<style scoped>
main {
  position: relative;
  background-color: var(--color-white-background);
  padding-block-start: 10rem;
  z-index: 1;
}

#background-image {
  position: absolute;
  bottom: 0;
  right: -310px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
}
</style>
