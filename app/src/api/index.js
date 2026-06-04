import axios from "axios";
import { useAuth } from "@/stores/authStore";

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error.response?.status === 401 &&
            !error.config._retry &&
            !error.config.url?.includes("/auth/")
        ) {
            error.config._retry = true;
            const auth = useAuth();
            const refreshed = await auth.refreshAccessToken();
            if (refreshed) {
                error.config.headers["Authorization"] = `Bearer ${auth.token}`;
                return instance(error.config);
            }
            auth.logout();
        }
        throw error;
    }
);

export default instance;
