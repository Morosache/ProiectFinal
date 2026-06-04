import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        delete: vi.fn(),
    }
}))

import axios from '@/api'
import { useTransfers } from '@/stores/transfersStore'

describe('transfersStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('initial state has empty transfers array', () => {
        const store = useTransfers()
        expect(store.transfers).toEqual([])
    })

    it('fetchTransfers populates transfers', async () => {
        const mockData = [
            { id: 1, amount: 500, source: 'Cash', destination: 'Card' }
        ]
        axios.get.mockResolvedValue({ data: mockData })

        const store = useTransfers()
        await store.fetchTransfers()

        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/transfers')
        expect(store.transfers).toEqual(mockData)
    })

    it('addTransfer calls POST and appends to transfers', async () => {
        const newTransfer = { id: 2, amount: 200, source: 'Card', destination: 'Economies' }
        axios.post.mockResolvedValue({ data: newTransfer })

        const store = useTransfers()
        await store.addTransfer({ amount: 200, source: 'Card', destination: 'Economies' })

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/transfers',
            { amount: 200, source: 'Card', destination: 'Economies' }
        )
        expect(store.transfers).toContainEqual(newTransfer)
    })

    it('removeTransfer calls DELETE and filters locally', async () => {
        axios.delete.mockResolvedValue({})
        const store = useTransfers()
        store.transfers = [{ id: 1 }, { id: 2 }]

        await store.removeTransfer(1)

        expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/transfers/delete/1')
        expect(store.transfers).toEqual([{ id: 2 }])
    })
})
