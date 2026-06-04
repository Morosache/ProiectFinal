import { defineStore } from 'pinia'
import axios from '@/api'

const API = "http://localhost:3000"

export const useTransaction = defineStore('transaction', {
    state: () => ({
        transactions: [],
    }),

    actions: {
        async fetchTransactions() {
            const { data } = await axios.get(`${API}/transactions`)
            console.log('raspuns API:', data)
            this.transactions = data
        },

        async addTransaction(transaction) {
            await axios.post(`${API}/transactions`, transaction)
        },

        async removeTransaction(id) {
            await axios.delete(`${API}/transactions/delete/${id}`)
            this.transactions = this.transactions.filter(transaction => transaction.id !== id)
        },

        async editTransaction(id, updatedTransaction) {
            const { data } = await axios.put(`${API}/transactions/update/${id}`, updatedTransaction)
            console.log('raspuns edit:', data)
            this.transactions = this.transactions.map(transaction => transaction.id === id ? data : transaction)
        },
    },

    getters: {
        transactionCost: (state) => state.transactions.reduce((total, item) => total + Number(item.price), 0),

        cashTransactionCost: (state) => state.transactions.filter(item => item.paymentMethod === 'Cash').reduce((total, item) => total + Number(item.price), 0),

        cardTransactionCost: (state) => state.transactions.filter(item => item.paymentMethod === 'Card').reduce((total, item) => total + Number(item.price), 0),
    }
})
