import axios from 'axios';


import { URL_BACKEND } from "../environments/environments"

const token = localStorage.getItem('token')

export const authAxios = axios.create({
    baseUrl: URL_BACKEND,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

