<script setup lang="ts">
import ShoeCard from '@/components/ShoeCard.vue'
import IconRestart from '@/components/icons/IconRestart.vue'
import { quizContextKey, quizResultContextKey } from '@/quiz'
import { RouterLink } from 'vue-router'
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
    .map(([shoeId]) => quizContext?.quiz.value?.shoes.find((shoe) => shoe.id === shoeId))
})
const recommendationCopy = computed(() => {
  if (recommendedShoes.value.length === 0) {
    return 'Based on your selection we have found your shoe recommendations.'
  }

  return `Based on your selection we've decided on the ${recommendedShoes.value
    .slice(0, 2)
    .map((shoe) => shoe?.name)
    .join(' and ')}! Enjoy the 30 day trial!`
})

const recommendationSections = computed(() => [
  {
    key: 'recommended',
    title: undefined,
    shoes: recommendedShoes.value.slice(0, 2),
  },
  {
    key: 'similar-profiles',
    title: 'Similar Profiles',
    shoes: recommendedShoes.value.slice(2, 3),
  },
])
</script>

<template>
  <section>
    <h1>Congratulations!</h1>
    <p>{{ recommendationCopy }}</p>
    <template v-for="section in recommendationSections" :key="section.key">
      <h2 v-if="section.title">{{ section.title }}</h2>
      <ol>
        <template v-for="(shoe, index) in section.shoes" :key="shoe?.id ?? index">
          <li>
            <ShoeCard>
              <template #header>
                <img :src="getShoeImageUrl(shoe?.id)" :alt="shoe?.name" />
              </template>
              <template #content>
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
    </template>
    <RouterLink to="/quiz" class="restart"><IconRestart />Restart Quiz</RouterLink>
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

  .restart {
    align-self: center;
    color: var(--color-gray-text);
    text-decoration: none;
  }
}
</style>
