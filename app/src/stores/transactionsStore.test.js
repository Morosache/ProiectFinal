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

import axios from '@/api'
import { useTransaction } from '@/stores/transactionsStore'

describe('transactionsStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('initial state has empty transactions array', () => {
        const store = useTransaction()
        expect(store.transactions).toEqual([])
    })

    it('fetchTransactions populates transactions', async () => {
        const mockData = [
            { id: 1, name: 'Food', price: 50, paymentMethod: 'Cash' },
            { id: 2, name: 'Gas', price: 100, paymentMethod: 'Card' }
        ]
        axios.get.mockResolvedValue({ data: mockData })

        const store = useTransaction()
        await store.fetchTransactions()

        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/transactions')
        expect(store.transactions).toEqual(mockData)
    })

    it('addTransaction sends POST request', async () => {
        axios.post.mockResolvedValue({ data: { id: 3, name: 'Test', price: 30 } })

        const store = useTransaction()
        await store.addTransaction({ name: 'Test', price: 30 })

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/transactions',
            { name: 'Test', price: 30 }
        )
    })

    it('removeTransaction calls DELETE and filters locally', async () => {
        axios.delete.mockResolvedValue({})
        const store = useTransaction()
        store.transactions = [{ id: 1 }, { id: 2 }]

        await store.removeTransaction(1)

        expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/transactions/delete/1')
        expect(store.transactions).toEqual([{ id: 2 }])
    })

    it('editTransaction calls PUT and updates local state', async () => {
        const updated = { id: 1, name: 'Updated', price: 200, paymentMethod: 'Card' }
        axios.put.mockResolvedValue({ data: updated })

        const store = useTransaction()
        store.transactions = [{ id: 1, name: 'Old', price: 100, paymentMethod: 'Cash' }]

        await store.editTransaction(1, { name: 'Updated', price: 200 })

        expect(axios.put).toHaveBeenCalledWith(
            'http://localhost:3000/transactions/update/1',
            { name: 'Updated', price: 200 }
        )
        expect(store.transactions[0]).toEqual(updated)
    })

    it('transactionCost sums all transaction prices', () => {
        const store = useTransaction()
        store.transactions = [
            { price: '100', paymentMethod: 'Cash' },
            { price: '50', paymentMethod: 'Card' },
            { price: '25', paymentMethod: 'Cash' },
        ]
        expect(store.transactionCost).toBe(175)
    })

    it('transactionCost returns 0 for empty list', () => {
        const store = useTransaction()
        expect(store.transactionCost).toBe(0)
    })

    it('cashTransactionCost sums only Cash transactions', () => {
        const store = useTransaction()
        store.transactions = [
            { price: '100', paymentMethod: 'Cash' },
            { price: '50', paymentMethod: 'Card' },
        ]
        expect(store.cashTransactionCost).toBe(100)
    })

    it('cardTransactionCost sums only Card transactions', () => {
        const store = useTransaction()
        store.transactions = [
            { price: '100', paymentMethod: 'Cash' },
            { price: '50', paymentMethod: 'Card' },
        ]
        expect(store.cardTransactionCost).toBe(50)
    })
})
