import { URL_BACKEND } from '../environments/environments'
import { authAxios } from './axiosHelpers';



export const getPersonal = async() => {

    const rpta = await authAxios.get(`${URL_BACKEND}/personal`)
    return rpta
}

export const deletePersonalById = async(id) => {

    const rpta = await authAxios.delete(`${URL_BACKEND}/personal/${id}`)
    return rpta
}

export const postPersonal = async(objUsuario) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/personal`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const getPersonalById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/personal/${id}`)
    return rpta
}

export const putPersonalById = async(objUsuario) => {
    const rpta = await authAxios.put(`${URL_BACKEND}/personal/${objUsuario.id}`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}