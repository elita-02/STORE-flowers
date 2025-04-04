import axios from "axios"

export const apiClient = axios.create({
    baseURL: "https://67d824499d5e3a10152d94d1.mockapi.io/"
})