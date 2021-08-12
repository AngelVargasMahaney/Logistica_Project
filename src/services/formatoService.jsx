import axios from 'axios';

import { URL_BACKEND } from "../environments/environments"


export const getFormatos = async () => {

    const rpta = await axios.get(`${URL_BACKEND}/formatos`)
    return rpta
}

export const postFormatos = async (objFormato) => {
    const rpta = await axios.post(`${URL_BACKEND}/formatos`,
        JSON.stringify(objFormato),
        { headers: { 'Content-Type': 'application/json' } })
    return rpta
}