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
import { useIncome } from '@/stores/incomeStore'

describe('incomeStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('initial state has empty incomes array', () => {
        const store = useIncome()
        expect(store.incomes).toEqual([])
    })

    it('fetchIncome populates incomes', async () => {
        const mockData = [
            { id: 1, amount: 5000, category: 'Card', source: 'Salary' },
            { id: 2, amount: 1000, category: 'Cash', source: 'Gift' }
        ]
        axios.get.mockResolvedValue({ data: mockData })

        const store = useIncome()
        await store.fetchIncome()

        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/incomes')
        expect(store.incomes).toEqual(mockData)
    })

    it('addIncome calls POST and appends to incomes', async () => {
        const newIncome = { id: 3, amount: 2000, category: 'Card', source: 'Salary' }
        axios.post.mockResolvedValue({ data: newIncome })

        const store = useIncome()
        await store.addIncome({ amount: 2000, category: 'Card', source: 'Salary' })

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/incomes',
            { amount: 2000, category: 'Card', source: 'Salary' }
        )
        expect(store.incomes).toContainEqual(newIncome)
    })

    it('removeIncome calls DELETE and filters locally', async () => {
        axios.delete.mockResolvedValue({})
        const store = useIncome()
        store.incomes = [{ id: 1 }, { id: 2 }]

        await store.removeIncome(1)

        expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/incomes/delete/1')
        expect(store.incomes).toEqual([{ id: 2 }])
    })

    it('editIncome calls PUT and updates local state', async () => {
        const updated = { id: 1, amount: 6000, category: 'Card', source: 'Salary' }
        axios.put.mockResolvedValue({ data: updated })

        const store = useIncome()
        store.incomes = [{ id: 1, amount: 5000, category: 'Card', source: 'Salary' }]

        await store.editIncome(1, { amount: 6000 })

        expect(store.incomes[0]).toEqual(updated)
    })

    it('totalBudget sums all incomes', () => {
        const store = useIncome()
        store.incomes = [
            { amount: '3000', category: 'Card' },
            { amount: '1000', category: 'Cash' },
            { amount: '500', category: 'Economies' },
        ]
        expect(store.totalBudget).toBe(4500)
    })

    it('totalBudget returns 0 for empty list', () => {
        const store = useIncome()
        expect(store.totalBudget).toBe(0)
    })

    it('cashBudget sums only Cash incomes', () => {
        const store = useIncome()
        store.incomes = [
            { amount: '3000', category: 'Card' },
            { amount: '1000', category: 'Cash' },
        ]
        expect(store.cashBudget).toBe(1000)
    })

    it('cardBudget sums only Card incomes', () => {
        const store = useIncome()
        store.incomes = [
            { amount: '3000', category: 'Card' },
            { amount: '1000', category: 'Cash' },
        ]
        expect(store.cardBudget).toBe(3000)
    })

    it('economiesBudget sums only Economies incomes', () => {
        const store = useIncome()
        store.incomes = [
            { amount: '500', category: 'Economies' },
            { amount: '1000', category: 'Cash' },
        ]
        expect(store.economiesBudget).toBe(500)
    })
})
