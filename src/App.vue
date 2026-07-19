<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IconBurger from './components/icons/IconBurger.vue'
import IconBrand from './components/icons/IconBrand.vue'
</script>

<template>
  <header>
    <div id="burger">
      <IconBurger />
    </div>
    <div id="brand">
      <RouterLink :to="{ name: 'home' }"><IconBrand /></RouterLink>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  background-color: var(--color-header-background);
  padding: 1rem;
  border-block-end: 4px solid var(--color-white-background);

  #burger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--color-gray-text);
    }
  }

  #brand {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-inline-start: -3rem;

    svg {
      height: 5rem;
      width: auto;
      color: var(--color-black-button);
    }
  }
}
</style>
