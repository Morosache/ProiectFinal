import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuth } from '@/stores/authStore'

import LogIn from '../pages/auth/LogIn.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'
import ForgotYourPassword from '../pages/auth/ForgotYourPassword.vue'
import EnterCode from '../pages/auth/EnterCode.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import ResetSuccesful from '@/pages/auth/ResetSuccesful.vue'
import HomePage from '@/pages/main-pages/HomePage.vue'
import BudgetPage from '@/pages/main-pages/BudgetPage.vue'
import TransactionsPage from '@/pages/main-pages/TransactionsPage.vue'
import StatisticsPage from '@/pages/main-pages/StatisticsPage.vue'
import SettingsPage from '@/pages/main-pages/SettingsPage.vue'
import TransfersPage from '@/pages/main-pages/TransfersPage.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LogIn },
    { path: '/register', name: 'register', component: RegisterPage },
    { path: '/forgot-your-password', name: 'forgot-password', component: ForgotYourPassword },
    { path: '/enter-code', name: 'enter-code', component: EnterCode },
    { path: '/reset-password', name: 'reset-password', component: ResetPassword },
    { path: '/reset-succesful', name: 'reset-succesful', component: ResetSuccesful },
    { path: '/home-page', name: 'home-page', component: HomePage, meta: { requiresAuth: true } },
    { path: '/budget-page', name: 'budget-page', component: BudgetPage, meta: { requiresAuth: true } },
    { path: '/transactions-page', name: 'transactions-page', component: TransactionsPage, meta: { requiresAuth: true } },
    { path: '/statistics-page', name: 'statistics-page', component: StatisticsPage, meta: { requiresAuth: true } },
    { path: '/settings-page', name: 'settings-page', component: SettingsPage, meta: { requiresAuth: true } },
    { path: '/transfers-page', name: 'transfers-page', component: TransfersPage, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/home-page' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to) => {
    const auth = useAuth()

    if (to.path === '/login' && auth.isAuthenticated) {
        return '/home-page'
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return '/login'
    }

    return true
})

export default router
