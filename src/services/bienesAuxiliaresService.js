
import { URL_BACKEND } from '../environments/environments'
import { authAxios } from './axiosHelpers';

export const getBienAuxiliar = async() => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-auxiliares`)
    return rpta
}

export const deleteBienAuxiliarById = async(id) => {
    const rpta = await authAxios.delete(`${URL_BACKEND}/bienes-auxiliares/${id}`)
    return rpta
}

export const postBienAuxiliar = async(objUsuario) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-auxiliares`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}


export const postBienAuxiliarFiles = async (objFile, config) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-auxiliares`,
        objFile,
        config)
    return rpta
}

export const getBienAuxiliarById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-auxiliares/${id}`)
    return rpta
}

export const postBienAuxiliarById = async(objUsuario, config, id) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-auxiliares/${id}`, objUsuario, config)
    return rpta
}