import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/router/router', () => ({
    default: { push: vi.fn() }
}))

vi.mock('@/api', () => ({
    default: { post: vi.fn() }
}))

import axios from '@/api'
import router from '@/router/router'
import { useAuth } from '@/stores/authStore'

describe('authStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
        localStorage.clear()
    })

    it('initial state: not authenticated when no token in localStorage', () => {
        const store = useAuth()
        expect(store.isAuthenticated).toBe(false)
        expect(store.token).toBe('')
        expect(store.refreshToken).toBe('')
    })

    it('setTokens persists tokens to localStorage and sets isAuthenticated', () => {
        const store = useAuth()
        store.setTokens('access-tok', 'refresh-tok')

        expect(store.token).toBe('access-tok')
        expect(store.refreshToken).toBe('refresh-tok')
        expect(store.isAuthenticated).toBe(true)
        expect(localStorage.getItem('token')).toBe('access-tok')
        expect(localStorage.getItem('refreshToken')).toBe('refresh-tok')
    })

    it('clearTokens removes tokens from localStorage and sets isAuthenticated false', () => {
        const store = useAuth()
        store.setTokens('access-tok', 'refresh-tok')
        store.clearTokens()

        expect(store.token).toBe('')
        expect(store.refreshToken).toBe('')
        expect(store.isAuthenticated).toBe(false)
        expect(localStorage.getItem('token')).toBeNull()
        expect(localStorage.getItem('refreshToken')).toBeNull()
    })

    it('checkCredentials on success sets tokens and redirects to home-page', async () => {
        axios.post.mockResolvedValue({
            data: { success: true, token: 'tok', refreshToken: 'ref' }
        })

        const store = useAuth()
        const result = await store.checkCredentials('admin', 'admin123')

        expect(store.isAuthenticated).toBe(true)
        expect(store.token).toBe('tok')
        expect(router.push).toHaveBeenCalledWith('/home-page')
        expect(result).toBeUndefined()
    })

    it('checkCredentials on invalid credentials returns message and stays unauthenticated', async () => {
        axios.post.mockResolvedValue({
            data: { success: false, message: 'Invalid credentials' }
        })

        const store = useAuth()
        const result = await store.checkCredentials('admin', 'wrong')

        expect(store.isAuthenticated).toBe(false)
        expect(result).toBe('Invalid credentials')
    })

    it('checkCredentials on network error returns generic error message', async () => {
        axios.post.mockRejectedValue(new Error('Network error'))

        const store = useAuth()
        const result = await store.checkCredentials('admin', 'admin123')

        expect(store.isAuthenticated).toBe(false)
        expect(result).toBe('An error occurred. Please try again.')
    })

    it('refreshAccessToken returns false when no refresh token stored', async () => {
        const store = useAuth()
        const result = await store.refreshAccessToken()
        expect(result).toBe(false)
        expect(axios.post).not.toHaveBeenCalled()
    })

    it('refreshAccessToken on success updates tokens and returns true', async () => {
        axios.post.mockResolvedValue({
            data: { success: true, token: 'new-tok', refreshToken: 'new-ref' }
        })

        const store = useAuth()
        store.refreshToken = 'old-ref'
        const result = await store.refreshAccessToken()

        expect(result).toBe(true)
        expect(store.token).toBe('new-tok')
        expect(store.refreshToken).toBe('new-ref')
    })

    it('refreshAccessToken on failure clears tokens and redirects to login', async () => {
        axios.post.mockRejectedValue(new Error('Expired'))

        const store = useAuth()
        store.setTokens('tok', 'ref')
        await store.refreshAccessToken()

        expect(store.isAuthenticated).toBe(false)
        expect(router.push).toHaveBeenCalledWith('/login')
    })

    it('logout clears tokens and redirects to login', () => {
        const store = useAuth()
        store.setTokens('tok', 'ref')
        store.logout()

        expect(store.isAuthenticated).toBe(false)
        expect(router.push).toHaveBeenCalledWith('/login')
    })
})
