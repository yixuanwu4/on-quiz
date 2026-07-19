import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../layouts/QuizLayout.vue'),
      children: [
        {
          path: 'loading',
          name: 'loading',
          component: () => import('../views/LoadingView.vue'),
        },
        {
          path: 'result',
          name: 'result',
          component: () => import('../views/ResultView.vue'),
        },
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
