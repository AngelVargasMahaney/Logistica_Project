
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
