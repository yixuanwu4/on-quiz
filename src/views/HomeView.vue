<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1>Take the quiz<br />and try your first pair!</h1>
    <RouterLink to="/quiz" class="button primary">Try On Trial</RouterLink>
    <span class="footnote">30 Days risk free</span>
  </main>
</template>
