import { URL_BACKEND } from '../environments/environments'
import { authAxios } from './axiosHelpers';

export const getBienesDirin = async () => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-dirin`)
    return rpta
}

export const getBienDirinById = async (id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-dirin/${id}`)
    return rpta
}

export const deleteBienDirinById = async (id) => {
    const rpta = await authAxios.delete(`${URL_BACKEND}/bienes-dirin/${id}`)
    return rpta
}

export const postBienDirin = async (objFile, config) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-dirin`, objFile,
        config)
    return rpta
}

export const postEditarBienDirinById = async (objFile, config, id) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-dirin/${id}`, objFile,
        config)
    return rpta
}

