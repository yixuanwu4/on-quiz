<template>
  <div class="shoe-card">
    <header>
      <slot name="header" />
    </header>
    <article>
      <slot name="content" />
    </article>
  </div>
</template>

<style scoped>
.shoe-card {
  background-color: var(--color-white-background);

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;

    :global(img) {
      max-width: clamp(20rem, 30rem, 60%);
      height: auto;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  }
}
</style>
