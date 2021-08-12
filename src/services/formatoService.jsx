import axios from 'axios';

import { URL_BACKEND } from "../environments/environments"


export const getFormatos = async () => {

    const rpta = await axios.get(`${URL_BACKEND}/formatos`)
    return rpta
}



export const postFormatosFiles = async (objFile, config) => {


    const rpta = await axios.post(`${URL_BACKEND}/formatos`,
        objFile,
        config)
    return rpta
}
export const deleteFormatoById = async (id) => {

    const rpta = await axios.delete(`${URL_BACKEND}/formatos/${id}`)
    return rpta
}
