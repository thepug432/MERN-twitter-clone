import axios from 'axios'

const API_URL = '/api/authusers/'

export const registerService = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

export const loginService = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

export const logoutService = () => {
    localStorage.removeItem('user')
}