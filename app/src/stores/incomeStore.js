import { defineStore } from 'pinia'
import axios from '@/api'

const API = "http://localhost:3000"

export const useIncome = defineStore('income', {
    state: () => ({
        incomes: [],
    }),

    actions: {
        async fetchIncome() {
            const { data } = await axios.get(`${API}/incomes`)
            this.incomes = data
        },

        async addIncome(income) {
            const { data } = await axios.post(`${API}/incomes`, income)
            this.incomes.push(data)
        },

        async removeIncome(id) {
            await axios.delete(`${API}/incomes/delete/${id}`)
            this.incomes = this.incomes.filter(income => income.id !== id)
        },

        async editIncome(id, updatedIncome) {
            const { data } = await axios.put(`${API}/incomes/update/${id}`, updatedIncome)
            this.incomes = this.incomes.map(income => income.id === id ? data : income)
        },
    },

    getters: ({
        totalBudget: (state) => state.incomes.reduce((total, item) => total + Number(item.amount), 0),

        cashBudget: (state) => state.incomes.filter(item => item.category === 'Cash').reduce((total, item) => total + Number(item.amount), 0),

        cardBudget: (state) => state.incomes.filter(item => item.category === 'Card').reduce((total, item) => total + Number(item.amount), 0),

        economiesBudget: (state) => state.incomes.filter(item => item.category === 'Economies').reduce((total, item) => total + Number(item.amount), 0),
    })
})
