import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWsStore } from '@/stores/wsStore'

describe('wsStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('initial state has null latestTransaction', () => {
        const store = useWsStore()
        expect(store.latestTransaction).toBeNull()
    })

    it('latestTransaction can be set to a created event', () => {
        const store = useWsStore()
        const event = { type: 'transaction:created', data: { id: 1, name: 'Food' } }
        store.latestTransaction = event

        expect(store.latestTransaction).toEqual(event)
        expect(store.latestTransaction.type).toBe('transaction:created')
    })

    it('latestTransaction can be set to a deleted event', () => {
        const store = useWsStore()
        store.latestTransaction = { type: 'transaction:deleted', data: { id: 5 } }

        expect(store.latestTransaction.type).toBe('transaction:deleted')
        expect(store.latestTransaction.data.id).toBe(5)
    })

    it('latestTransaction can be overwritten', () => {
        const store = useWsStore()
        store.latestTransaction = { type: 'transaction:created', data: { id: 1 } }
        store.latestTransaction = { type: 'transaction:deleted', data: { id: 1 } }

        expect(store.latestTransaction.type).toBe('transaction:deleted')
    })
})
