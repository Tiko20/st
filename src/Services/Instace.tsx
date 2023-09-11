import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

export const instance: AxiosInstance = axios.create({
    baseURL: " http://localhost:8080/"
})

instance.interceptors.request.use((request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token")
    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
}, (error: AxiosError) => {
    return Promise.reject(error);
}
)

instance.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
    return response;
})