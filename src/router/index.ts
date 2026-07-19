import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/quiz/result',
      name: 'result',
      component: () => import('../views/ResultView.vue'),
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../layouts/QuizLayout.vue'),
      children: [
        {
          path: ':questionId',
          name: 'question',
          component: () => import('../views/QuestionView.vue'),
        },
      ],
    },
  ],
})

export default router
