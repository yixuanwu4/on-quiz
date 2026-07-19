<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import {
  quizAnswersContextKey,
  quizContextKey,
  quizResultContextKey,
  type QuizResult,
} from '@/quiz'

const MIN_LOADING_TIME = 2000
const MAX_LOADING_TIME = 6000

const router = useRouter()
const quizContext = inject(quizContextKey)
const quizAnswersContext = inject(quizAnswersContextKey)
const quizResultContext = inject(quizResultContextKey)
let redirectTimer: ReturnType<typeof window.setTimeout> | undefined

if (!quizContext || !quizAnswersContext || !quizResultContext) {
  throw new Error('LoadingView must be rendered inside QuizLayout')
}

// Have a little loading show for the user, but not too long. Randomize the time to make it feel more natural.
function getRandomLoadingTime() {
  return Math.floor(Math.random() * (MAX_LOADING_TIME - MIN_LOADING_TIME + 1)) + MIN_LOADING_TIME
}

function calculateResult() {
  const quiz = quizContext!.quiz.value
  const answers = quizAnswersContext!.answers.value
  const result: QuizResult = {}

  for (const shoe of quiz?.shoes ?? []) {
    result[shoe.id] = 0
  }

  for (const [questionId, answerIndex] of Object.entries(answers)) {
    const selectedAnswer = quiz?.questions.find((question) => question.id === Number(questionId))
      ?.answers[answerIndex]

    if (!selectedAnswer) {
      continue
    }

    for (const [shoeId, ratingIncrease] of Object.entries(selectedAnswer.ratingIncrease)) {
      result[shoeId] = (result[shoeId] ?? 0) + ratingIncrease
    }
  }

  return result
}

onMounted(() => {
  quizResultContext!.setResult(calculateResult())

  redirectTimer = window.setTimeout(() => {
    void router.replace({ name: 'result' })
  }, getRandomLoadingTime())
})

onUnmounted(() => {
  if (redirectTimer) {
    window.clearTimeout(redirectTimer)
  }
})
</script>

<template>
  <main>Loading...</main>
</template>
