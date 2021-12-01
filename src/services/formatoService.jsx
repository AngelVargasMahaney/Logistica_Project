
import axios from "axios";
import { URL_BACKEND } from "../environments/environments"
import { authAxios } from './axiosHelpers';


export const getFormatos = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/formatos`)
    return rpta
}




export const postFormatosFiles = async (objFile, config) => {


    const rpta = await authAxios.post(`${URL_BACKEND}/formatos`,
        objFile,
        config)
    return rpta
}
export const deleteFormatoById = async (id) => {

    const rpta = await authAxios.delete(`${URL_BACKEND}/formatos/${id}`)
    return rpta
}

export const postEditarFormato1ById = async (objFormato1, config, id) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/formatos/${id}`, objFormato1, config)
    return rpta
}

export const getBienFormato1ById = async (id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/formatos/${id}`)
    return rpta
}