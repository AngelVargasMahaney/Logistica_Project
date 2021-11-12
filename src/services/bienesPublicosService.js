
import { URL_BACKEND } from '../environments/environments'
import { authAxios } from './axiosHelpers';


export const getInfoFormatoById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes/ubicacion?bien_id=${id}&tipo_bien=1`)
    return rpta
}

export const getInfoBienAuxiliarById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes/ubicacion?bien_id=${id}&tipo_bien=2`)
    return rpta
}

export const getInfoEquipoPolicialById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes/ubicacion?bien_id=${id}&tipo_bien=3`)
    return rpta
}
export const getInfoUnidadesTransporteById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes/ubicacion?bien_id=${id}&tipo_bien=4`)
    return rpta
}
export const getInfoBienesDirinById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/bienes/ubicacion?bien_id=${id}&tipo_bien=5`)
    return rpta
}

