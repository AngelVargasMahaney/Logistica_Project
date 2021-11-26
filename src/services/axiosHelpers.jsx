import axios from 'axios';

import { URL_BACKEND } from "../environments/environments"





export const authAxios = axios.create();

authAxios.interceptors.request.use(
    async config => {
        const token = await localStorage.getItem('token')
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

authAxios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const primerRequest = error.config;
    if (error.response.status === 403 && !primerRequest._retry) {
        primerRequest._retry = true;
         const token_llamada2 = await localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token_llamada2;
        return authAxios(primerRequest);
    }
    return Promise.reject(error);
});