import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    }
}))

import { useBalance } from '@/stores/balanceStore'
import { useIncome } from '@/stores/incomeStore'
import { useTransaction } from '@/stores/transactionsStore'

describe('balanceStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('totalBalance = total incomes minus total transactions', () => {
        const incomeStore = useIncome()
        const transactionStore = useTransaction()
        incomeStore.incomes = [{ amount: '5000', category: 'Card' }]
        transactionStore.transactions = [{ price: '1000', paymentMethod: 'Card' }]

        const store = useBalance()
        expect(store.totalBalance).toBe(4000)
    })

    it('totalBalance is 0 when incomes equal transactions', () => {
        const incomeStore = useIncome()
        const transactionStore = useTransaction()
        incomeStore.incomes = [{ amount: '1000', category: 'Cash' }]
        transactionStore.transactions = [{ price: '1000', paymentMethod: 'Cash' }]

        const store = useBalance()
        expect(store.totalBalance).toBe(0)
    })

    it('totalCashBalance = cash incomes minus cash transactions', () => {
        const incomeStore = useIncome()
        const transactionStore = useTransaction()
        incomeStore.incomes = [
            { amount: '3000', category: 'Cash' },
            { amount: '2000', category: 'Card' },
        ]
        transactionStore.transactions = [
            { price: '500', paymentMethod: 'Cash' },
            { price: '200', paymentMethod: 'Card' },
        ]

        const store = useBalance()
        expect(store.totalCashBalance).toBe(2500)
    })

    it('totalCardBalance = card incomes minus card transactions', () => {
        const incomeStore = useIncome()
        const transactionStore = useTransaction()
        incomeStore.incomes = [{ amount: '2000', category: 'Card' }]
        transactionStore.transactions = [{ price: '300', paymentMethod: 'Card' }]

        const store = useBalance()
        expect(store.totalCardBalance).toBe(1700)
    })

    it('totalBalance is negative when transactions exceed incomes', () => {
        const incomeStore = useIncome()
        const transactionStore = useTransaction()
        incomeStore.incomes = [{ amount: '100', category: 'Cash' }]
        transactionStore.transactions = [{ price: '500', paymentMethod: 'Cash' }]

        const store = useBalance()
        expect(store.totalBalance).toBe(-400)
    })
})
