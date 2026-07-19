<script setup lang="ts">
import { quizAnswersContextKey, quizContextKey, quizResultContextKey } from '@/quiz'
import { computed, inject } from 'vue'

const quizAnswersContext = inject(quizAnswersContextKey)
const quizContext = inject(quizContextKey)
const quizResultContext = inject(quizResultContextKey)

const selectedAnswers = computed(() => quizAnswersContext?.answers.value ?? {})
const recommendedShoes = computed(() => {
  const result = quizResultContext?.result.value ?? {}

  return Object.entries(result)
    .sort(([, firstRating], [, secondRating]) => secondRating - firstRating)
    .slice(0, 2)
    .map(
      ([shoeId]) =>
        quizContext?.quiz.value?.shoes.find((shoe) => shoe.id === shoeId)?.name ?? shoeId,
    )
})
const recommendationCopy = computed(() => {
  if (recommendedShoes.value.length === 0) {
    return 'Based on your selection we have found your shoe recommendations.'
  }

  return `Based on your selection we've decided on the ${recommendedShoes.value.join(' and ')}! Enjoy the 30 day trial!`
})

const getSelectedAnswer = (questionId: string | number, answerIndex: unknown) => {
  const selectedQuestionId = Number(questionId)
  // Convert answerIndex to a number if it's a string, otherwise use it as is
  // This is necessary because not each answer has an id property, so we need to use the index of the answer in the answers array to retrieve the copy.
  const answerIdx =
    typeof answerIndex === 'number'
      ? answerIndex
      : typeof answerIndex === 'string'
        ? Number(answerIndex)
        : NaN

  if (!Number.isInteger(selectedQuestionId) || !Number.isInteger(answerIdx)) {
    return undefined
  }

  return (
    quizContext?.quiz.value?.questions.find((question) => question.id === selectedQuestionId)
      ?.answers[answerIdx] || undefined
  )
}
</script>

<template>
  <main>
    <h1>Congratulations!</h1>
    <p>{{ recommendationCopy }}</p>
    <dl>
      <template v-for="(answerIndex, questionId) in selectedAnswers" :key="`${questionId}`">
        <dt>Question {{ Number(questionId) + 1 }}</dt>
        <dd>
          {{ getSelectedAnswer(questionId, answerIndex)?.copy ?? '' }}
        </dd>
      </template>
    </dl>
  </main>
</template>
