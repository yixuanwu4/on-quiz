import type { InjectionKey, Ref } from 'vue'
import type { Quiz } from './api'

export type QuizContext = {
  quiz: Ref<Quiz | null>
  isLoading: Ref<boolean>
  error: Ref<string | null>
}

export const quizContextKey = Symbol('quiz-context') as InjectionKey<QuizContext>


export type QuizAnswers = {
  [questionId: number]: number
}

export type QuizAnswersContext = {
  answers: Ref<QuizAnswers>
  setAnswer: (questionId: number, answerIndex: number) => void
}

export const quizAnswersContextKey = Symbol('quiz-answers-context') as InjectionKey<QuizAnswersContext>


export type QuizResult = {
  [shoe: string]: number // Rating per shoe
}

export type QuizResultContext = {
  result: Ref<QuizResult>
  setResult: (results: QuizResult) => void
}

export const quizResultContextKey = Symbol('quiz-result-context') as InjectionKey<QuizResultContext>
