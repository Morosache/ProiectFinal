import router from "@/router/router"
import { defineStore } from "pinia"
import axios from "axios"

export const useAuth = defineStore("auth", {
    state: () => ({
        isAuthenticated: false
    }),
    actions: {
        async checkCredentials(email, password) {
            try {
                const response = await axios.post("http://localhost:3000/auth/login", {
                    email,
                    password
                })
                console.log("Login response:", response.data)
                if (response.data.success) {
                    this.isAuthenticated = true
                    router.push("/home-page") // Redirect to home page after successful login
                } else {
                    this.isAuthenticated = false
                    return response.data.message
                }
            } catch (error) {
                this.isAuthenticated = false
                return error
            }
        },
        logout() {
            this.isAuthenticated = false
            router.push("/login") // Redirect to login page after logout
        }
    }
})