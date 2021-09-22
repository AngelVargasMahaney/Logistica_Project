
import { URL_BACKEND } from '../environments/environments'
import { authAxios } from './axiosHelpers';


export const getHistorialFormatoById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes/historial?bien_id=${id}&tipo_bien=1`)
    return rpta
}

export const getHistorialBienAuxiliarById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes/historial?bien_id=${id}&tipo_bien=2`)
    return rpta
}

export const getHistorialEquipoPolicialById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes/historial?bien_id=${id}&tipo_bien=3`)
    return rpta
}

