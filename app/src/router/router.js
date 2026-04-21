import {createRouter, createWebHashHistory} from 'vue-router'

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
        {path:'/', redirect:'/login'},
        {path: '/login', name:'login', component: LogIn },
        {path:'/register', name:'register', component: RegisterPage},
        {path:'/forgot-your-password', name:'forgot-password', component: ForgotYourPassword},
        {path:'/enter-code', name:'enter-code', component: EnterCode},
        {path:'/reset-password', name:'reset-password', component: ResetPassword},
        {path:'/reset-succesful', name:'reset-succesful', component: ResetSuccesful},
        {path:'/home-page', name:'home-page', component: HomePage},
        {path:'/budget-page', name:'budget-page', component: BudgetPage},
        {path:'/transactions-page', name:'transactions-page', component: TransactionsPage},
        {path:'/statistics-page', name:'statistics-page', component: StatisticsPage},
        {path:'/settings-page', name:'settings-page', component: SettingsPage},
        {path:'/transfers-page', name:'transfers-page', component: TransfersPage},
        { path: '/:pathMatch(.*)*', redirect: '/home-page' }
    ]

    const router = createRouter({
        history: createWebHashHistory('/ProiectFinal/'),
        routes
    })

    export default router