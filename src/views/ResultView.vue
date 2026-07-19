<script setup lang="ts">
import { quizAnswersContextKey, quizContextKey } from '@/quiz'
import { computed, inject } from 'vue'

const quizAnswersContext = inject(quizAnswersContextKey)
const quizContext = inject(quizContextKey)

const selectedAnswers = computed(() => quizAnswersContext?.answers.value ?? {})

const getSelectedAnswerCopy = (questionId: string | number, answerIndex: unknown) => {
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
    return ''
  }

  return (
    quizContext?.quiz.value?.questions.find((question) => question.id === selectedQuestionId)
      ?.answers[answerIdx]?.copy ?? ''
  )
}
</script>

<template>
  <main>
    <h1>Congratulations!</h1>
    <p>Based on your selection we've decided on the xx and xx! Enjoy the 30 day trial!</p>
    <dl>
      <template v-for="(answerIndex, questionId) in selectedAnswers" :key="`${questionId}`">
        <dt>Question {{ Number(questionId) + 1 }}</dt>
        <dd>
          {{ getSelectedAnswerCopy(questionId, answerIndex) }}
        </dd>
      </template>
    </dl>
  </main>
</template>
