import { defineStore } from 'pinia';
import { useIncome } from './incomeStore';


export const useTransfers = defineStore('transfer', {
    
    state: () =>  ({
        transfers: [],
        nextId: 1,
    }),

    actions: {
           addTransfer(transfer) {
            this.transfers.push({
                ...transfer,
                id: this.nextId++
            })
        },  
        removeTransfer(id) {
            this.transfers = this.transfers.filter(transfer => transfer.id !== id)
        },

        cashToCard(amount) {
            const incomeStore = useIncome();
            const value = Number(amount)

            if(incomeStore.cashBalance >= value) {
            incomeStore.cardBalance += value;
            incomeStore.cashBalance -= value;
            }
        },

        cardToCash(amount) {
            const incomeStore = useIncome();
            const value = Number(amount)

            if(incomeStore.cardBalance >= value) {
            incomeStore.cashBalance += value;
            incomeStore.cardBalance -= value;
            }
        }
    },
})