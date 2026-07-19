<script setup lang="ts">
import { RouterView } from 'vue-router'
import IconBurger from './components/icons/IconBurger.vue'
import IconBrand from './components/icons/IconBrand.vue'
</script>

<template>
  <header><IconBurger /><IconBrand /></header>

  <RouterView />

  <footer>Footer</footer>
</template>

<style scoped></style>
