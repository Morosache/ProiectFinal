import {defineStore} from 'pinia'

export const useIncome = defineStore('income', {
    state: () => ({
        incomes : [],
        nextId : 1,
    }),

    actions: ({
        addIncome(income) {
            this.incomes.push({
                ...income,
                id: this.nextId++
            })
        },

        removeIncome(id) {
            this.incomes = this.incomes.filter(income => income.id !== id)
        },

        editIncome(id, updatedIncome) {
            this.incomes = this.incomes.map(income =>{
                 if(income.id === id){
                    return { ...updatedIncome, id};
                 }
                 else {
                    return income;
                 }
            })

        }
    }),

    getters: ({
        totalBudget: (state) => state.incomes.reduce((total, item) => total + Number(item.amount), 0),

        cashBudget: (state) => state.incomes.filter(item => item.category === 'Cash').reduce((total, item) => total + Number(item.amount), 0),

        cardBudget: (state) => state.incomes.filter(item => item.category === 'Card').reduce((total, item) => total + Number(item.amount), 0),
        
        economiesBudget: (state) => state.incomes.filter(item => item.category === 'Economies').reduce((total, item) => total + Number(item.amount), 0),

    })

})