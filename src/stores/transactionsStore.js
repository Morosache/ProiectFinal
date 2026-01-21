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
        },

        removeTransaction(id) {
            this.transactions = this.transactions.filter(transaction => transaction.id !== id)
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
        }
    },

    getters: {
        transactionCost: (state) => state.transactions.reduce((total, item) => total + Number(item.price), 0),

        cashTransactionCost: (state) => state.transactions.filter(item => item.paymentMethod === 'Cash').reduce((total, item) => total + Number(item.price), 0),
        
        cardTransactionCost: (state) => state.transactions.filter(item => item.paymentMethod === 'Card').reduce((total, item) => total + Number(item.price), 0),
}
    }
)