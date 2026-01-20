import {defineStore} from 'pinia'

export const useTransaction = defineStore('transaction', {
    state: () => ({
        transactions: [],
        nextId: 1,
    }),

    actions: {

        addTransaction(transaction) {
            this.transactions.push({
                ...transaction,
                id: this.nextId++
            })
             localStorage.setItem("transactions", JSON.stringify(this.transactions))
        },

        removeTransaction(id) {
            this.transactions = this.transactions.filter(transaction => transaction.id !== id)
             localStorage.setItem("transactions", JSON.stringify(this.transactions))
        },

        editTransaction(id, updatedTransaction) {
            this.transactions = this.transactions.map(transaction =>{
                 if(transaction.id === id){
                    return { ...updatedTransaction, id};
                 }
                 else {
                    return transaction;
                 }
            })
             localStorage.setItem("transactions", JSON.stringify(this.transactions))

        }
    }
    }
)