<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

import type { Quiz } from '@/api'
import { quizAnswersContextKey, quizContextKey, type QuizAnswers } from '@/quiz'

const route = useRoute()
const router = useRouter()

const quiz = ref<Quiz | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const answers = ref<QuizAnswers>({})

const firstQuestion = computed(() => quiz.value?.questions[0] ?? null)

function setAnswer(questionId: number, answerIndex: number) {
  answers.value = {
    ...answers.value,
    [questionId]: answerIndex,
  }
}

provide(quizContextKey, { quiz, isLoading, error })
provide(quizAnswersContextKey, { answers, setAnswer })

async function loadQuiz() {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data.json`)

    if (!response.ok) {
      throw new Error(`Failed to load quiz data (${response.status})`)
    }

    quiz.value = (await response.json()) as Quiz
  } catch (loadError) {
    error.value = loadError instanceof Error ? loadError.message : 'Failed to load quiz data'
  } finally {
    isLoading.value = false
  }
}

void loadQuiz()

watch([isLoading, firstQuestion, () => route.name], ([loading, question, routeName]) => {
  if (loading || routeName !== 'quiz') {
    return
  }

  if (!question) {
    error.value = 'No questions available.'
    return
  }

  void router.replace({ name: 'question', params: { questionId: String(question.id) } })
})
</script>

<template>
  <main>
    <p v-if="isLoading">Loading quiz...</p>
    <p v-else-if="error">{{ error }}</p>
    <RouterView v-else />
  </main>
</template>
