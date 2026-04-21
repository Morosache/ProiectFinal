import {defineStore} from 'pinia'

export const useUser = defineStore('user', {
    state: () => ({
        currency: 'RON',
        theme: 'Light'
        
    }),
})