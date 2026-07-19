<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Answer } from '@/api'
import { quizContextKey, quizAnswersContextKey } from '@/quiz'

const route = useRoute()
const router = useRouter()
const quizContext = inject(quizContextKey)
const quizAnswersContext = inject(quizAnswersContextKey)

if (!quizContext || !quizContext.quiz) {
  throw new Error('QuestionView must be rendered inside QuizLayout')
}

const question = computed(() => {
  const questionId = Number(route.params.questionId)

  return (
    quizContext.quiz.value?.questions.find((quizQuestion) => quizQuestion.id === questionId) ?? null
  )
})

function answerQuestion(answer: Answer) {
  // Store the answer for the current question
  quizAnswersContext?.setAnswer(question.value!.id, question.value!.answers.indexOf(answer))

  // Navigate to the result view if there is no next question
  if (answer.nextQuestion === '') {
    void router.push({ name: 'result' })
    return
  }

  // Navigate to the next question
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
