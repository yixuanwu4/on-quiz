<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

import type { Quiz } from '@/api'
import {
  quizAnswersContextKey,
  quizContextKey,
  quizResultContextKey,
  type QuizAnswers,
  type QuizResult,
} from '@/quiz'

const route = useRoute()
const router = useRouter()

const quiz = ref<Quiz | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const QUIZ_ANSWERS_STORAGE_KEY = 'quiz-answers'
const QUIZ_RESULT_STORAGE_KEY = 'quiz-result'

function getStoredQuizValue<T extends Record<string, number>>(key: string): T {
  const storedValue = window.localStorage.getItem(key)

  if (!storedValue) {
    return {} as T
  }

  try {
    const parsedValue = JSON.parse(storedValue)

    return parsedValue && typeof parsedValue === 'object' && !Array.isArray(parsedValue)
      ? (parsedValue as T)
      : ({} as T)
  } catch {
    return {} as T
  }
}

function storeQuizValue(key: string, value: Record<string, number>) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const answers = ref<QuizAnswers>(getStoredQuizValue<QuizAnswers>(QUIZ_ANSWERS_STORAGE_KEY))
const result = ref<QuizResult>(getStoredQuizValue<QuizResult>(QUIZ_RESULT_STORAGE_KEY))

const firstQuestion = computed(() => quiz.value?.questions[0] ?? null)
const isResultPage = computed(() => route.name === 'result')

function setAnswer(questionId: number, answerIndex: number) {
  answers.value = {
    ...answers.value,
    [questionId]: answerIndex,
  }
  storeQuizValue(QUIZ_ANSWERS_STORAGE_KEY, answers.value)
}

function setResult(results: QuizResult) {
  result.value = results
  storeQuizValue(QUIZ_RESULT_STORAGE_KEY, result.value)
}

provide(quizContextKey, { quiz, isLoading, error })
provide(quizAnswersContextKey, { answers, setAnswer })
provide(quizResultContextKey, { result, setResult })

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
  <main :class="{ 'result-page': isResultPage }">
    <p v-if="isLoading">Loading quiz...</p>
    <p v-else-if="error">{{ error }}</p>
    <template v-else>
      <p class="hint" v-if="!isResultPage">Try On Quiz<br />30 Days Risk Free</p>
      <RouterView />
    </template>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: var(--color-black-background);
  color: var(--color-white-text);
  padding-block-start: 2rem;
}

main.result-page {
  background-color: var(--color-header-background);
  color: var(--color-black-text);
}

.hint {
  text-align: center;
}
</style>
