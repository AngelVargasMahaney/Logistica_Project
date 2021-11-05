import { URL_BACKEND } from "../environments/environments";
import { authAxios } from "./axiosHelpers";

export const getUnidadesTransporte = async () => {
    const rpta = await authAxios.get(`${URL_BACKEND}/unidades-transporte`)
    return rpta
}

export const deleteUnidadesTransporteById = async (id) => {
    const rpta = await authAxios.delete(`${URL_BACKEND}/unidades-transporte/${id}`)
    return rpta
}

export const postUnidadesTransporte = async (objFile, config) => {

    const rpta = await authAxios.post(`${URL_BACKEND}/unidades-transporte`,
        objFile,
        config)

    return rpta
}

export const putEditarUnidadTransporteById = async (objFormato1, config, id) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/unidades-transporte/${id}`, objFormato1, config)
    return rpta
}

export const getUnidadTransportById = async (id)=>{
    const rpta = await authAxios.get(`${URL_BACKEND}/unidades-transporte/${id}`)
    return rpta
}
export const getBienesInternadoUnidadesTransporte = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-internados?tipo_bien=4`)
    return rpta
}
