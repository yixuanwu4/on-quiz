<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Answer } from '@/api'
import { quizContextKey } from '@/quiz'

const route = useRoute()
const router = useRouter()
const quizContext = inject(quizContextKey)

if (!quizContext) {
  throw new Error('QuestionView must be rendered inside QuizLayout')
}

const question = computed(() => {
  const questionId = Number(route.params.questionId)

  return (
    quizContext.quiz.value?.questions.find((quizQuestion) => quizQuestion.id === questionId) ?? null
  )
})

function answerQuestion(answer: Answer) {
  if (answer.nextQuestion === '') {
    void router.push({ name: 'result' })
    return
  }

  void router.push({ name: 'question', params: { questionId: String(answer.nextQuestion) } })
}
</script>

<template>
  <section v-if="question">
    <span>Question {{ question.id + 1 }}</span>
    <h1>{{ question.copy }}</h1>

    <button
      v-for="answer in question.answers"
      :key="answer.copy"
      type="button"
      @click="answerQuestion(answer)"
    >
      {{ answer.copy }}
    </button>
  </section>

  <p v-else>Question not found.</p>
</template>
