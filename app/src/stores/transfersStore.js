import { defineStore } from 'pinia'
import { useIncome } from './incomeStore'
import axios from 'axios'

const API = 'http://localhost:3000'

export const useTransfers = defineStore('transfer', {
    state: () => ({
        transfers: [],
    }),

    actions: {
        async fetchTransfers(transfer) {
            const { data } = await axios.get(`${API}/transfers`)
            this.transfers = data

            const incomeStore = useIncome()
            await incomeStore.addIncome({
                source: 'Other',
                amount: -Number(transfer.amount),
                category: transfer.source,
                observations: `Transfer catre ${transfer.destination}`
            })

            // adauga income pozitiv pe destinatie
            await incomeStore.addIncome({
                source: 'Other',
                amount: Number(transfer.amount),
                category: transfer.destination,
                observations: `Transfer din ${transfer.source}`
            })
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
