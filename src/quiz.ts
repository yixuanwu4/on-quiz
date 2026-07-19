import type { InjectionKey, Ref } from 'vue'
import type { Quiz } from './api'

export type QuizContext = {
  quiz: Ref<Quiz | null>
  isLoading: Ref<boolean>
  error: Ref<string | null>
}

export const quizContextKey = Symbol('quiz-context') as InjectionKey<QuizContext>
