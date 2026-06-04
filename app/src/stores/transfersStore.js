import { defineStore } from 'pinia'
import axios from '@/api'

const API = 'http://localhost:3000'

export const useTransfers = defineStore('transfer', {
    state: () => ({
        transfers: [],
    }),

    actions: {
        async fetchTransfers() {
            const { data } = await axios.get(`${API}/transfers`)
            this.transfers = data
        },

        async addTransfer(transfer) {
            const { data } = await axios.post(`${API}/transfers`, transfer)
            this.transfers.push(data)
        },

        async removeTransfer(id) {
            await axios.delete(`${API}/transfers/delete/${id}`)
            this.transfers = this.transfers.filter(t => t.id !== id)
        },
    },
})
