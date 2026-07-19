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

  // Navigate to the loading view if there is no next question
  if (answer.nextQuestion === '') {
    void router.push({ name: 'loading' })
    return
  }

  // Navigate to the next question
  void router.push({ name: 'question', params: { questionId: String(answer.nextQuestion) } })
}
</script>

<template>
  <section v-if="question">
    <h1>{{ question.copy }}</h1>

    <div>
      <button
        v-for="answer in question.answers"
        :key="answer.copy"
        type="button"
        @click="answerQuestion(answer)"
      >
        {{ answer.copy }}
      </button>
    </div>
  </section>

  <p v-else>Question not found.</p>
</template>

<style scoped>
section {
  display: flex;
  margin-block-start: 10rem;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
  padding-inline: 1rem;
}

div {
  display: flex;
  gap: 2rem;
  width: 100%;

  button {
    display: block;
    padding: 1.5rem 3rem;
    background: transparent;
    border: 1px solid var(--color-white-background);
    color: var(--color-white-background);
    flex: 1;
    font-size: 1.6rem;
    cursor: pointer;
  }
}

@media (max-width: 640px) {
  section {
    margin-block-start: 5rem;
    gap: 5rem;
  }

  div {
    flex-direction: column;
    gap: 1rem;

    button {
      padding: 1rem 2rem;
      font-size: 1.4rem;
    }
  }
}
</style>
