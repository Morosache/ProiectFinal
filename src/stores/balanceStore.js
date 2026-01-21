import { defineStore } from 'pinia';
import { useIncome } from './incomeStore';
import { useTransaction } from './transactionsStore';


export const useBalance = defineStore('balance', {
    getters: {
        
        totalBalance: () => {
            const  incomeStore = useIncome();
            const transactionStore = useTransaction();

            const totalIncomes = incomeStore.totalBudget;
            const totalTransactions = transactionStore.transactionCost;
            
            return totalIncomes - totalTransactions;
        },

        totalCashBalance: () => {
            const  incomeStore = useIncome();
            const transactionStore = useTransaction();

            const totalCashIncomes = incomeStore.cashBudget;
            const totalCashTransactions = transactionStore.cashTransactionCost;

            return totalCashIncomes - totalCashTransactions;
        },

        totalCardBalance: () => {
            const  incomeStore = useIncome();
            const transactionStore = useTransaction();

            const totalCardIncomes = incomeStore.cardBudget;
            const totalCardTransactions = transactionStore.cardTransactionCost;

            return totalCardIncomes - totalCardTransactions;
        }
    }
})