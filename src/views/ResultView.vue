<script setup lang="ts">
import ShoeCard from '@/components/ShoeCard.vue'
import { quizContextKey, quizResultContextKey } from '@/quiz'
import { computed, inject } from 'vue'

const quizContext = inject(quizContextKey)
const quizResultContext = inject(quizResultContextKey)
const shoeImages = import.meta.glob('@/assets/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

const getShoeImageUrl = (shoeId?: string) => {
  return shoeId ? (shoeImages[`/src/assets/${shoeId}.png`] as string | undefined) : undefined
}

const recommendedShoes = computed(() => {
  const result = quizResultContext?.result.value ?? {}

  return Object.entries(result)
    .sort(([, firstRating], [, secondRating]) => secondRating - firstRating)
    .slice(0, 2)
    .map(([shoeId]) => quizContext?.quiz.value?.shoes.find((shoe) => shoe.id === shoeId))
})
const recommendationCopy = computed(() => {
  if (recommendedShoes.value.length === 0) {
    return 'Based on your selection we have found your shoe recommendations.'
  }

  return `Based on your selection we've decided on the ${recommendedShoes.value.map((shoe) => shoe?.name).join(' and ')}! Enjoy the 30 day trial!`
})
</script>

<template>
  <section>
    <h1>Congratulations!</h1>
    <p>{{ recommendationCopy }}</p>
    <ol>
      <template v-for="(shoe, index) in recommendedShoes" :key="index">
        <li>
          <ShoeCard>
            <template v-slot:header>
              <img :src="getShoeImageUrl(shoe?.id)" :alt="shoe?.name" />
            </template>
            <template v-slot:content>
              <h2>{{ shoe?.name }}</h2>
              <p class="description">
                Your perfect partner in the world's lightest fully-cushioned shoe for Running
                Remixed.
              </p>
              <p class="meta">200 CHF | Neon & Grey</p>
              <img
                src="@/assets/colorselection.png"
                alt="Color selection"
                class="color-selection"
              />
            </template>
          </ShoeCard>
          <a href="https://on.com" class="button secondary">Shop now</a>
        </li>
      </template>
    </ol>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ol {
    padding: 0;
    list-style: none;

    li {
      display: flex;
      flex-direction: column;

      .button {
        align-self: center;
      }

      .description {
        color: var(--color-gray-text);
      }

      .color-selection {
        width: 6rem;
      }
    }
  }
}
</style>
